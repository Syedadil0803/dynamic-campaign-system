import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: App
    },
    {
      path: '/announcement',
      component: App
    },
    {
      path: '/promo',
      component: App
    }
  ]
})

export default router
