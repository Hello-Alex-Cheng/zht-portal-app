
import { ActionContext, ActionTree, Module, MutationTree } from "vuex"
import { RootState } from '../../interface-types'
import UserModuleStateType, { ApplicationType } from './interface-types'

// @ts-ignore
import applications from "/public/base-admin/menus"

export enum MutationTypes {
  SetRoles = "SET_ROLES",
  SetApplications = "SET_APPLICATIONS",
  SetCurrentApp = "SET_CURRENT_APP"
}

export enum ActionTypes {
  GetInfo = "GET_INFO",
  GetApplictions = "GET_APPLICATONS"
}

type ActionArgs = Omit<ActionContext<UserModuleStateType, UserModuleStateType>, 'commit'> & {
  commit<k extends keyof Mutations<UserModuleStateType>>(
    key: k,
    payload: Parameters<Mutations<UserModuleStateType>[k]>[1]
  ): ReturnType<Mutations<UserModuleStateType>[k]>
}

export type Mutations<T> = {
  [MutationTypes.SetRoles](state: T, roles: Array<string>): void
  [MutationTypes.SetApplications](state: T, apps: Array<ApplicationType>): void
  [MutationTypes.SetCurrentApp](state: T, app: ApplicationType): void
}

export type Actions = {
  [ActionTypes.GetInfo](context: ActionArgs): void
  [ActionTypes.GetApplictions](context: ActionArgs): void
}

const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  applications: [],
  currentApp: {}
}

const mutations: MutationTree<UserModuleStateType> & Mutations<UserModuleStateType> = {
  SET_ROLES(state: UserModuleStateType, roles: Array<string>) {
    state.roles = roles
  },
  SET_APPLICATIONS(state: UserModuleStateType, apps: Array<ApplicationType>) {
    state.applications = apps
  },
  SET_CURRENT_APP(state: UserModuleStateType, app: ApplicationType) {
    state.currentApp = app
  }
}

const actions: ActionTree<UserModuleStateType, UserModuleStateType> & Actions = {
  [ActionTypes.GetInfo]({ commit }) {
    return new Promise((resolve, reject) => {
      // getInfo() 获取接口

      const roles = ['admin', 'editor']
      commit(MutationTypes.SetRoles, roles)
      resolve(roles)
    })
  },
  [ActionTypes.GetApplictions]({ commit }) {
    return new Promise<void>((resolve, reject) => {
      commit(MutationTypes.SetApplications, applications)
      commit(MutationTypes.SetCurrentApp, applications[0])
      resolve()
    })
  }
}

const UserModule: Module<UserModuleStateType, RootState> = {
  namespaced:  true,
  state,
  mutations,
  // @ts-ignore
  actions
}

export default UserModule
