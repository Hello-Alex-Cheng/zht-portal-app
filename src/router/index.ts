
import { createRouter, createWebHistory } from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import(/* webpackChunkName: "Home" */ "@/views/home/index.vue")
  //     }
  //   ]
  // },
  // {
  //   path: '/iconfont',
  //   redirect: '/iconfont/base',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'base',
  //       component: () => import(/* webpackChunkName: "Iconfont" */ "@/views/iconfont/index.vue")
  //     }
  //   ]
  // },
  // {
  //   path: '/store',
  //   redirect: '/store/base',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'base',
  //       component: () => import(/* webpackChunkName: "Store" */ "@/views/store/index.vue")
  //     }
  //   ]
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
  // {
  //   path: '/vue-base',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'home',
  //       component: RouterView,
  //     },
  //     {
  //       path: 'about',
  //       component: RouterView,
  //     }
  //   ]
  // },
  {
    path: '/:catchAll(.*)',
    redirect: '/portal-error404'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})
