import { ActionContext, ActionTree, Module, MutationTree } from "vuex"
import { RouterView } from 'vue-router'
import router from '@/router'
import { RootState } from '../../interface-types'
import PermissionsModuleTypes, { RouteType, ChildRouteType } from './interface-types'

// @ts-ignore
import asyncRoutesMap from "/public/base-admin/routes"

export enum MutationTypes {
  SetRoutes = "SET_ROUTES"
}

export type Mutations<T> = {
  [MutationTypes.SetRoutes](state: T, routes: RouteType[]): void
}


export enum ActionTypes {
  GenerateRoutes = "GENERATE_ROUTES"
}

type ActionArgs = Omit<ActionContext<PermissionsModuleTypes, PermissionsModuleTypes>, 'commit'> & {
  commit<k extends keyof Mutations<PermissionsModuleTypes>>(
    key: k,
    payload: Parameters<Mutations<PermissionsModuleTypes>[k]>[1]
  ): ReturnType<Mutations<PermissionsModuleTypes>[k]>
}

export type Actions = {
  [ActionTypes.GenerateRoutes](context: ActionArgs): void
}

const state = {
  routes: []
}

const mutations: MutationTree<PermissionsModuleTypes> & Mutations<PermissionsModuleTypes> = {
  [MutationTypes.SetRoutes](state: PermissionsModuleTypes, routes: RouteType[]) {
    state.routes = routes
  }
}

const handleParseChildRoutes = (childs: ChildRouteType, prePath: string): ChildRouteType => {
  if (childs) {
    // @ts-ignore
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

const actions: ActionTree<PermissionsModuleTypes, PermissionsModuleTypes> & Actions = {
  // @ts-ignore
  [ActionTypes.GenerateRoutes]({ commit }, roles: string[]) {
    // 可以根据 roles 来选择性返回 route
    // console.log('permissions roles', roles)
    return new Promise<void>((resolve, reject) => {
      asyncRoutesMap.forEach((route: RouteType) => {
        router.addRoute({
          name: route.name,
          path: route.path,
          redirect: route.redirect ? route.redirect : undefined,
          component: () => import(`@/${route.component.toLowerCase()}/index.vue`),
          // @ts-ignore
          children: handleParseChildRoutes((route.children as ChildRouteType), route.path)
        })
      })

      // 经过处理之后，可以返回 accessRoutes
      commit(MutationTypes.SetRoutes, asyncRoutesMap)

      resolve(asyncRoutesMap)
    })
  }
}

const PermissionsModule: Module<PermissionsModuleTypes, RootState> = {
  namespaced: true,
  state,
  mutations,
  // @ts-ignore
  actions
}

export default PermissionsModule
