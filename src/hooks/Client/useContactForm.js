import React from 'react'
import axios from '@/lib/axios'
import useSWR from 'swr'
import Swal from 'sweetalert2'

export default function useContactForm() {

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const submitForms = async({setLoading, reset, ...props}) => {
        await csrf()    
        
        axios.post('/api/contact-us', props)
        .then((res) => {
            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for reaching out to us. We will get back to you as soon as possible.',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            reset()
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error',
                text: 'There was an error sending your message. Please try again later.',
                icon: 'error',
            })
        })
        .finally(() => {
            setLoading(false)
        })





    }




  return {
    submitForms
  }
}
