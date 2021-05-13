
import { ActionContext, ActionTree, Module, MutationTree } from "vuex"
import { RootState } from '../../interface-types'
import UserModuleStateType, { ApplicationType } from './interface-types'

// @ts-ignore
import applications from "/public/base-admin/menus"

export enum MutationTypes {
  SET_ROLES = "SET_ROLES",
  SET_APPLICATIONS = "SET_APPLICATIONS",
  SET_CURRENT_APP = "SET_CURRENT_APP"
}

export enum ActionTypes {
  GetInfo = "GET_INFO",
  GetApplictions = "GET_APPLICATONS"
}

type ActionArgs = Omit<ActionContext<UserModuleStateType, RootState>, 'commit'> & {
  commit<k extends keyof Mutations>(
    key: k,
    payload: Parameters<Mutations[k]>[1]
  ): ReturnType<Mutations[k]>
}

export type Mutations<T = UserModuleStateType> = {
  [MutationTypes.SET_ROLES](state: T, roles: Array<string>): void
  [MutationTypes.SET_APPLICATIONS](state: T, apps: Array<ApplicationType>): void
  [MutationTypes.SET_CURRENT_APP](state: T, app: ApplicationType): void
}

export type Actions = {
  [ActionTypes.GetInfo]({ commit }: ActionArgs): void
  [ActionTypes.GetApplictions]({ commit }: ActionArgs): void
}

const state: UserModuleStateType = {
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  applications: [],
  currentApp: {}
}

const mutations: MutationTree<UserModuleStateType> & Mutations = {
  [MutationTypes.SET_ROLES](state: UserModuleStateType, roles: Array<string>) {
    state.roles = roles
  },
  [MutationTypes.SET_APPLICATIONS](state: UserModuleStateType, apps: Array<ApplicationType>) {
    state.applications = apps
  },
  [MutationTypes.SET_CURRENT_APP](state: UserModuleStateType, app: ApplicationType) {
    state.currentApp = app
  }
}

const actions: ActionTree<UserModuleStateType, RootState> & Actions = {
  [ActionTypes.GetInfo]({ commit }) {
    return new Promise((resolve, reject) => {
      // getInfo() 获取接口
      const roles = ['admin', 'editor']
      commit(MutationTypes.SET_ROLES, roles)
      resolve(roles)
    })
  },
  [ActionTypes.GetApplictions]({ commit }) {
    return new Promise<void>((resolve, reject) => {
      commit(MutationTypes.SET_APPLICATIONS, applications)
      commit(MutationTypes.SET_CURRENT_APP, applications[0])
      resolve()
    })
  }
}

const UserModule: Module<UserModuleStateType, RootState> = {
  namespaced:  true,
  state,
  mutations,
  actions
}

export default UserModule
