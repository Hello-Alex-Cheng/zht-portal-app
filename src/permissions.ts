import router from '@/router'
// @ts-ignore
import NProgress from "nprogress"
import { getToken } from './utils/auth'
import store from "@/store"

import { ActionTypes as userAction } from "@/store/modules/user/index"
import { ActionTypes as permissionAction } from "@/store/modules/permissions/index"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

type ChildRouteType= Array<RouteType>

interface RouteType {
  name: string,
  path: string,
  component: string,
  redirect?: string,
  children?: ChildRouteType
}

const whiteList = ['/portal-error404', '/portal-error401', '/portal-error500', '/login']

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const isWhite = whiteList.findIndex(w => w === to.path)

  NProgress.start()

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {

          await store.dispatch(`userModule/${userAction.GetApplictions}`)

          const roles = await store.dispatch(`userModule/${userAction.GetInfo}`)

          const accessRoutes = await store.dispatch(`permissionsModule/${permissionAction.GenerateRoutes}`, roles)

          next({ path: '/', replace: true })
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
    } else if (isWhite > -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
