import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
