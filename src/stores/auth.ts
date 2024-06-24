import { defineStore } from 'pinia'
import { getInfo } from '@/services/auth'
import type { user } from '@/utils/type'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: { name: 'Truyendz', age: 20 } as user | null,
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
  },
})
