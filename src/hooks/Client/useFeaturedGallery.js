import React from 'react'
import axios from '@/lib/axios'
import useSWR from 'swr'


export default function useFeaturedGallery() {


    const { data: featuredGallery, error, mutate, isLoading } = useSWR('/api/client/featured-gallery', () =>
        axios
            .get('/api/client/featured-gallery')
            .then(res => res.data?.products)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
            {
                refreshInterval: 10000
            }
    )

    return{
        featuredGallery, 
        isLoading
    }


}
