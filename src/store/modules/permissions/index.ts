// @ts-nocheck

import { Module } from "vuex"
import { RouterView } from 'vue-router'
import { message } from "ant-design-vue"
import { AxiosResponse } from 'axios'
import router from '@/router'

import { RootState } from '../../interface-types'
import PermissionsModuleTypes, { RouteType, ChildRouteType } from './interface-types'


// @ts-ignore
import asyncRoutesMap from "/public/base-admin/routes"

const state = {
  namespace: true,
  state: {
    routes: []
  }
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = routes
  }
}

const handleParseChildRoutes = (childs: ChildRouteType, prePath: string): ChildRouteType => {
  if (childs) {
    return childs.map((c: RouteType) => {
      return {
        name: c.name,
        path: c.path,
        component: c.component === 'RouterView' ? RouterView : () => import(`@/views${prePath}/index.vue`)
      }
    })
  } else {
    return []
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // 可以根据 roles 来选择性返回 route
    console.log('roles', roles)
    return new Promise<void>((resolve, reject) => {
      asyncRoutesMap.forEach((route: RouteType) => {
        router.addRoute({
          name: route.name,
          path: route.path,
          redirect: route.redirect ? route.redirect : undefined,
          component: () => import(`@/${route.component.toLowerCase()}/index.vue`),
          children: handleParseChildRoutes((route.children as ChildRouteType), route.path)
        })
      })

      // 经过处理之后，可以返回 accessRoutes
      commit('SET_ROUTES', asyncRoutesMap)

      resolve(asyncRoutesMap)
    })
  }
}

const PermissionsModule: Module<PermissionsModuleTypes, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default PermissionsModule
