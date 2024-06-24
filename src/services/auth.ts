import axios from 'axios'
import axiosApiInstance from '@/services/axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
export async function refreshAccessToken() {
  const refresh_token = localStorage.getItem('refresh_token')
  const data = {
    refreshToken: refresh_token,
  }
  return await axios.post('/auth/refresh-tokens', data)
}
export async function login(data: any) {
  return await axiosApiInstance.post('/auth/login', data)
}
export async function loginGGApi(data: any) {
  return await axiosApiInstance.post('/auth/login-gg', data)
}
export async function registerApi(data: any) {
  return await axiosApiInstance.post('/auth/register', data)
}
export async function getInfo() {
  return await axiosApiInstance.get('/users/me')
}
