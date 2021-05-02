
import { createRouter, createWebHistory, RouterView } from 'vue-router'

import Layout from '@/layouts/index.vue'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'

const constantRoutes = [
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
  },
  {
    path: '/vue-base',
    component: Layout,
    children: [
      {
        path: 'home',
        component: RouterView,
      },
      {
        path: 'about',
        component: RouterView,
      }
    ]
  },
  {
    path: '/portal-error404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/portal-error401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/portal-error500',
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/portal-error404'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})
