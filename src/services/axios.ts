/* eslint-disable no-console */
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
import { refreshAccessToken } from '@/services/auth'

const axiosApiInstance = axios.create()
// set base api
axiosApiInstance.defaults.baseURL = import.meta.env.VITE_API_URL
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    const access_token = localStorage.getItem('access_token')
    config.headers = {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401
      && !originalRequest._retry
      && originalRequest.url !== '/auth/refresh-tokens'
      && originalRequest.url !== '/auth/login'
    ) {
      originalRequest._retry = true
      try {
        const token = await refreshAccessToken()
        localStorage.setItem('access_token', token.data.access.token)
        localStorage.setItem('refresh_token', token.data.refresh.token)
        axios.defaults.headers.common.Authorization = `Bearer ${token.data.access.token}`
        return axiosApiInstance(originalRequest)
      }
      catch (error) {
        console.log(error, 'ERROR', originalRequest.url)
        notify({
          type: 'error',
          title: 'Authorization',
          text: 'Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại!',
        })
        localStorage.clear()
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  },
)
export default axiosApiInstance
