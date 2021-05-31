import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
  },
  {
    path: '/portal-error404',
    component: () => import(/* webpackChunkName: "portal-error404" */ '@/views/error-page/404.vue')
  },
  {
    path: '/portal-error401',
    component: () => import(/* webpackChunkName: "portal-error401" */ '@/views/error-page/401.vue')
  },
  {
    path: '/portal-error500',
    component: () => import(/* webpackChunkName: "portal-error500" */ '@/views/error-page/500.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/portal-error404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


export function setupRouter(app: App) {
  app.use(router)
}

export default router
