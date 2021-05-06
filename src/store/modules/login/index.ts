// @ts-nocheck

import { Module } from "vuex"
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

const LoginModule: Module<LoginModuleTypes, RootState> = {
  namespaced: true,
  state: {
    applications: [],
    currentApp: {}
  },
  mutations: {
    UPDATE_APPLICATION(state: LoginModuleTypes, payload: Array<any>) {
      state.applications = payload
    },
    UPDATE_CURRENT_APP(state, app) {
      state.currentApp = app
    }
  },
  actions: {
    async login(state, { user, psw}) {
      const res: AxiosResponse = await portalLogin('zht_password', user, psw)
      if ((res as ApiResponse).code === 0) {
        const { access_token } = res.data
        setToken(`Bearer ${access_token}`)
        message.success('login success')
        router.push('/')
      } else {
        message.error(res.errmsg)
      }
    }
  }
}

export default LoginModule
