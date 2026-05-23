import React from 'react'
import axios from '@/lib/axios'
import useSWR from 'swr'


export default function useCategory({category}) {


    const { data: categories, error, mutate, isLoading } = useSWR(`/api/client/gallery/${category}`, () =>
        axios
            .get(`/api/client/gallery/${category}`)
            .then(res => res.data[0])
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
            {
                refreshInterval: 10000
            }
    )

    return{
        categories, 
        isLoading
    }


}
