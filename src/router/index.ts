
import { createRouter, createWebHistory } from 'vue-router'

// @ts-ignore
import Layout from '@/layouts/index.vue'
// @ts-ignore
import Home from '@/views/home/index.vue'
// @ts-ignore
import Login from '@/views/login/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
