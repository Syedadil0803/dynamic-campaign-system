import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(),
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
