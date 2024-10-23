import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Menu from '../components/Menu.vue'
import Orders from '../components/Orders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
  ]
})

export default router
