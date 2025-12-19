import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // with request please send the cookies
})

export default axiosInstance