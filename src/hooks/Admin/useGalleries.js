'use client'

import axios from '@/lib/axios'
import Swal from 'sweetalert2'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'

export default function useGalleries({ search } = {}) {
  const shouldFetch = Boolean(search)
  const router = useRouter()

  const {
    data: products,
    error,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(
    shouldFetch ? `/api/admin/galleries/${search}` : null,
    url => axios.get(url).then(res => res.data),
    {
      refreshInterval: 10000,
    }
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const AddGallery = async ({ formData, reset, setLoading, setPreview, onSuccess }) => {
    try {
      setLoading?.(true)

      await csrf()

      const res = await axios.post('/api/admin/galleries/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.status === 200) {
        reset?.()
        setPreview?.(null)
        onSuccess?.(res.data)
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Something went wrong while submitting.'

      if (err?.response?.status === 422 && err?.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat().join('\n')

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
    } finally {
      setLoading?.(false)
    }
  }

  const DeleteGallery = async ({ id, onSuccess }) => {
    try {
      await csrf()

      const res = await axios.delete(`/api/admin/galleries/delete/${id}`)

      if (res.status === 200) {
        onSuccess?.(res.data)
        mutate()
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Something went wrong while deleting.'

      Swal.fire({
        title: 'Delete Failed',
        text: message,
        icon: 'error',
        confirmButtonColor: '#EA1B10',
      })


    }
  }

  const FeatureGallery = async({id, onSuccess}) => {

    try{
      await csrf()

      const res = await axios.put(`/api/admin/galleries/feature/${id}`)

      if(res.status === 200){
        onSuccess?.(res.data)
        mutate()
      }
    }catch(err){
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Something went wrong while featuring.'

        Swal.fire({
          title: 'Delete Failed',
          text: message,
          icon: 'error',
          confirmButtonColor: '#EA1B10',
        })
    }
  }

  const UnfeatureGallery = async({id, onSuccess}) => {

    try{
      await csrf()

      const res = await axios.put(`/api/admin/galleries/unfeature/${id}`)

      if(res.status === 200){
        onSuccess?.(res.data)
        mutate()
      }
    }catch(err){
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Something went wrong while featuring.'

        Swal.fire({
          title: 'Delete Failed',
          text: message,
          icon: 'error',
          confirmButtonColor: '#EA1B10',
        })
    }
  }

  const validateGallery = async ({ id, setError }) => {
      try {
          await csrf()
          const res = await axios.get('/api/validate-gallery', {
              params: { id }
          })
          return res.data
      } catch (err) {
          if (err?.response?.status === 404) {
              setError('The gallery you are trying to access does not exist.')
          } else {
              setError('Server error. Please try again later.')
          }
          return null
      }
  }
  
  const UpdateGallery = async({formData, setLoading, id}) => {
    await csrf()

    try{
      const res = await axios.post(`/api/admin/galleries/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if(res.status == 200){
          Swal.fire({
              title: "Success",
              text: "Edit Gallery Successfully",
              icon: "success",
              allowOutsideClick: false
          }).then((res) => {
              if(res.isConfirmed){
                  mutate()
                  router.push("/admin/gallery")
              }
          })
          
      }


      } catch (error) {
          console.log(error.response?.data || error)
          Swal.fire({
              title: "Error",
              text: error.response?.data || error,
              icon: "error"
          })
      } finally {
          setLoading(false)
      }


  }


  return {
    AddGallery,
    products,
    error,
    mutate,
    isLoading: shouldFetch && isLoading,
    isValidating,
    DeleteGallery,
    FeatureGallery,
    UnfeatureGallery,
    validateGallery,
    UpdateGallery
  }
}