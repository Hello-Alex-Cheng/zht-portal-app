import { ActionContext, ActionTree, Module, MutationTree } from "vuex"
import { RootState } from '../../interface-types'
import LoginModuleTypes from './interface-types'
import { message } from "ant-design-vue"
import { AxiosResponse } from 'axios'
import { setToken } from '@/utils/auth'
import { portalLogin } from '@/api/login'
import router from '@/router'

interface ApiResponse extends AxiosResponse {
  code: number,
  msg: string,
  data: any
}

export enum MutationTypes {
  UpdateToken = "UPDATE_TOKEN",
  UpdateUserName = "UPDATE_USER_NAME"
}

export type Mutations<T> = {
  [MutationTypes.UpdateToken](state: T, token: string): void
  [MutationTypes.UpdateUserName](state: T, name: string): void
}

const mutations: MutationTree<LoginModuleTypes> & Mutations<LoginModuleTypes> = {
  [MutationTypes.UpdateToken](state: LoginModuleTypes, payload: string) {
    state.token = payload
  },
  [MutationTypes.UpdateUserName](state: LoginModuleTypes, name: string) {
    state.username = name
  }
}

export enum ActionTypes {
  Login = "LOGIN"
}

type ActionArgs = Omit<ActionContext<LoginModuleTypes, LoginModuleTypes>, 'commit'> & {
  commit<k extends keyof Mutations<LoginModuleTypes>>(
    key: k,
    payload: Parameters<Mutations<LoginModuleTypes>[k]>[1]
  ): ReturnType<Mutations<LoginModuleTypes>[k]>
}

export type Actions = {
  [ActionTypes.Login](context: ActionArgs, payload: { user: string, psw: string }): void
}

const actions: ActionTree<LoginModuleTypes, LoginModuleTypes> & Actions = {
  async [ActionTypes.Login]({ commit }, { user, psw}) {
    const res: AxiosResponse = await portalLogin('zht_password', user, psw)
    if ((res as ApiResponse).code === 0) {
      const { access_token } = res.data
      commit(MutationTypes.UpdateToken, access_token)
      setToken(`Bearer ${access_token}`)
      message.success('login success')
      router.push('/')
    } else {
      // @ts-ignore
      message.error(res.errmsg)
    }
  }
}

const LoginModule: Module<LoginModuleTypes, RootState> = {
  namespaced: true,
  state: {
    token: '',
    username: ''
  },
  mutations,
  // @ts-ignore
  actions
}

export default LoginModule
