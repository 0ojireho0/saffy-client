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

    return{
        story, 
        isLoading
    }


}
