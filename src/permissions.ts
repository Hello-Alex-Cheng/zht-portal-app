import router from '@/router'
// @ts-ignore
import NProgress from "nprogress"
import { getToken } from './utils/auth'
import store from "@/store"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

type ChildRouteType= Array<RouteType>

interface RouteType {
  name: string,
  path: string,
  component: string,
  redirect?: string,
  children?: ChildRouteType
}

const whiteList = ['/portal-error404', '/portal-error401', '/portal-error500']

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const isWhite = whiteList.find(w => w === to.path)

  NProgress.start()

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log('hasRoles ' ,hasRoles)
      if (hasRoles) {
        next()
      } else {
        try {

          await store.dispatch('userModule/getApplicaionts')

          const { roles } = await store.dispatch('userModule/getInfo')

          const accessRoutes = await store.dispatch('permissionsModule/generateRoutes', roles)

          console.log('accessRoutes', accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  // console.log('全局路由后置守卫!', to, from)
  NProgress.done()
})
