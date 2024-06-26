import { defineStore } from 'pinia'
import { getInfo } from '@/services/auth'
import type { user } from '@/utils/type'
import api from '@/services/axios'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as user | null,
    token: '' as string | null,
    isLoggedIn: false,
  }),
  actions: {
    logout() {
      localStorage.removeItem('access_token')
      this.user = null
      this.isLoggedIn = false
      window.location.reload()
    },

    async initAuthStore() {
      if (localStorage.getItem('access_token')) {
        const { data } = await getInfo()
        this.user = data
        this.isLoggedIn = true
      }
    },

    setToken(newToken: string) {
      this.token = newToken
      localStorage.setItem('access_token', newToken)
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`
    },

    clearToken() {
      this.token = null
      localStorage.removeItem('access_token')
      api.defaults.headers.common.Authorization = null
    },

    checkToken() {
      const token = localStorage.getItem('access_token')
      if (token) {
        this.setToken(token)
      }
    },

    async login(payload: any) {
      try {
        const { data } = await api.post('/auth/', payload)
        this.setToken(data.token)
        return Promise.resolve()
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
  },
})
