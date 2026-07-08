import React from 'react'
import axios from '@/lib/axios'
import useSWR from 'swr'


export default function useStories() {


    const { data: story, error, mutate, isLoading } = useSWR('/api/client/stories', () =>
        axios
            .get('/api/client/stories')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
            {
                refreshInterval: 10000
            }
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const validateStory = async ({ id, setError }) => {
        try {
            await csrf()

            const res = await axios.get('/api/validate-story', {
                params: { id }
            })

            return res.data
        } catch (err) {
            if (err?.response?.status === 404) {
                setError('The story you are trying to access does not exist.')
            } else {
                setError('Server error. Please try again later.')
            }
            return null
        }
    }

    return{
        story, 
        isLoading,
        validateStory
    }


}
