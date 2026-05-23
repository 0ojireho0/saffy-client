import React from 'react'
import axios from '@/lib/axios'
import useSWR from 'swr'


export default function useGallery() {


    const { data: gallery, error, mutate, isLoading } = useSWR('/api/client/gallery', () =>
        axios
            .get('/api/client/gallery')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
            {
                refreshInterval: 10000
            }
    )

    return{
        gallery, 
        isLoading
    }


}
