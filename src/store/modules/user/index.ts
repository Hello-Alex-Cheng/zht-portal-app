import { Module } from "vuex"
import { RootState } from '../../interface-types'
import UserModuleTypes, { ApplicationType } from './interface-types'
import { message } from "ant-design-vue"
import { AxiosResponse } from 'axios'
import router from '@/router'
import { getToken, setToken } from "@/utils/auth"

// @ts-ignore
import applications from "/public/base-admin/menus"

const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  applications: [],
  currentApp: {}
}

const mutations = {
  SET_ROLES(state: UserModuleTypes, roles: Array<string>) {
    state.roles = roles
  },
  SET_APPLICATIONS(state: UserModuleTypes, apps: Array<ApplicationType>) {
    state.applications = apps
  },
  SET_CURRENT_APP(state: UserModuleTypes, app: ApplicationType) {
    state.currentApp = app
  }
}

const actions = {
  // @ts-ignore
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // getInfo() 获取接口

      const roles = ['admin', 'editor']
      commit('SET_ROLES', roles)
      resolve(roles)
    })
  },
  // @ts-ignore
  getApplicaionts({ commit }) {
    return new Promise<void>((resolve, reject) => {
      commit('SET_APPLICATIONS', applications)
      commit('SET_CURRENT_APP', applications[0])
      resolve()
    })
  }
}

const UserModule: Module<UserModuleTypes, RootState> = {
  namespaced:  true,
  // @ts-ignore
  state,
  mutations,
  actions
}

export default UserModule
