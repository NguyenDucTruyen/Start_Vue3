import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAuthStore } from '@/stores/auth'
import generatedRoutes from '~pages'

const authStore = useAuthStore()
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('access_token')
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' })
    } else {
      const user = authStore.user
      const userRole = user?.role || "USER"
      if (to.meta.roles && Array(to.meta.roles).length && !Array(to.meta.roles).includes(userRole)) {
        // console.log('403')
        next({ name: 'home' })
      }
    }
  } else {
    if (isLoggedIn && to.name === 'login') {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
