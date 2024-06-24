import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Notifications from '@kyvg/vue3-notification'
import Root from './Root.vue'
import router from './router'
import './assets/main.scss'

const app = createApp(Root)
const pinia = createPinia()
app.use(router)
app.use(Notifications)
app.use(pinia)

router.isReady().then(() => {
  app.mount('#root')
})
