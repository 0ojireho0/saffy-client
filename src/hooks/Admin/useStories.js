import React from 'react'

import axios from '@/lib/axios'
import Swal from 'sweetalert2'
import useSWR from 'swr'


export default function useStories() {


    const { data: story, error, mutate, isLoading } = useSWR('/api/admin/stories', () =>
        axios
            .get('/api/admin/stories')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
            {
                refreshInterval: 10000
            }
    )


    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const AddStory = async({formData, reset, setLoading, setPreviewUrl}) => {
        
        await csrf()

        axios.post('/api/admin/stories/add', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then((res) => {
                if(res.status == 200){
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success"
                    })
                    reset()
                    setPreviewUrl("")
                    mutate()

                }
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    'Something went wrong while submitting the story.'

                if (err?.response?.status === 422 && err?.response?.data?.errors) {
                    const errors = Object.values(err.response.data.errors)
                        .flat()
                        .join('\n')

                    Swal.fire({
                        title: 'Validation Error',
                        text: errors || message,
                        icon: 'error',
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: message,
                        icon: 'error',
                    })
                }
            })
            .finally(() => {
                setLoading(false)
            })



    }

    const DeleteStory = async({id, setShowDeleteConfirmation, setSelectedStoryId, setDeleteLoading}) => {
        await csrf()

        axios.delete(`/api/admin/stories/${id}`)
            .then((res) => {
                if(res.status == 200){
                    Swal.fire({
                        title: "Delete",
                        text: "Delete Content Successfully",
                        icon: "success",
                    })
                    mutate()
                    setShowDeleteConfirmation(false)
                    setSelectedStoryId(null)
                    
                }
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    "Something went wrong while deleting.";

                Swal.fire({
                    title: "Error",
                    text: message,
                    icon: "error",
                });
            })
            .finally(() => {
                setDeleteLoading(false)
            })


    }


    return{
        AddStory,
        story,
        isLoading,
        DeleteStory
    }

}
