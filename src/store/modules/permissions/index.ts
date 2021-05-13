import { ActionContext, ActionTree, Module, MutationTree } from "vuex"
import { RouterView } from 'vue-router'
import router from '@/router'
import { RootState } from '../../interface-types'
import PermissionsStateTypes, { RouteType, ChildRouteType } from './interface-types'

// @ts-ignore
import asyncRoutesMap from "/public/base-admin/routes"

export enum MutationTypes {
  SetRoutes = "SET_ROUTES"
}

export type Mutations<T = PermissionsStateTypes> = {
  [MutationTypes.SetRoutes](state: T, routes: RouteType[]): void
}

export enum ActionTypes {
  GenerateRoutes = "GENERATE_ROUTES"
}

type ActionArgs = Omit<ActionContext<PermissionsStateTypes, RootState>, 'commit'> & {
  commit<k extends keyof Mutations>(
    key: k,
    payload: Parameters<Mutations[k]>[1]
  ): ReturnType<Mutations[k]>
}

export type Actions = {
  [ActionTypes.GenerateRoutes]({ commit }: ActionArgs, roles: string[]): void
}

const state: PermissionsStateTypes = {
  routes: []
}

const mutations: MutationTree<PermissionsStateTypes> & Mutations = {
  [MutationTypes.SetRoutes](state: PermissionsStateTypes, routes: RouteType[]) {
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

const actions: ActionTree<PermissionsStateTypes, RootState> & Actions = {
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

const PermissionsModule: Module<PermissionsStateTypes, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default PermissionsModule
