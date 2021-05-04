// @ts-nocheck

import { Module } from "vuex"
import { RootState } from '../../interface-types'
import LoginModuleTypes from './interface-types'
import { message } from "ant-design-vue"
import { AxiosResponse } from 'axios'
import { setToken } from '@/utils/auth'
import { portalLogin, getUserMenuInfo, getUserInfo } from '@/api/login'
import router from '@/router'
import appMenus from "/public/base-admin/menus.js"

interface ApiResponse extends AxiosResponse {
  code: number,
  msg: string,
  data: any
}

const LoginModule: Module<LoginModuleTypes, RootState> = {
  namespaced: true,
  state: {
    applitions: []
  },
  mutations: {
    Update_Applications(state: LoginModuleTypes, payload: Array<any>) {
      console.log('payload', payload)
      state.applitions = payload
    }
  },
  actions: {
    async fetchAppLists(state, { user, psw}) {
      const res: AxiosResponse = await portalLogin('zht_password', user, psw)
      if ((res as ApiResponse).code === 0) {
        const { access_token } = res.data
        setToken(`Bearer ${access_token}`)


        const userMenuInfo = await getUserMenuInfo()
        const userInfo = await getUserInfo()

        state.commit('Update_Applications', appMenus)

        console.log('userMenuInfo ', userMenuInfo)
        console.log('userInfo ', userInfo)
        message.success('login success')
        router.push('/')
      } else {
        console.log('login error', res)
      }
    }
  }
}

export default LoginModule
