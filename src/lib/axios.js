import Axios from "axios";

export const isProd = process.env.NODE_ENV === 'production'

const axios = Axios.create({
    baseURL: isProd ? '/backend-api' : process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest'
    },
    withCredentials: true,
})

export default axios