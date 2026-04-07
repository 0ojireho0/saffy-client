import Axios from "axios";

export const isProd = process.env.NODE_ENV === 'production'

const axios = Axios.create({
    baseURL: isProd ? process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API : process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest'
    },
    withCredentials: true,
    // Configure CSRF token extraction and sending
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN'
})

// Add request interceptor to handle CSRF token properly
axios.interceptors.request.use(
    config => {
        // Ensure credentials are sent with every request
        config.withCredentials = true
        return config
    },
    error => Promise.reject(error)
)

export default axios