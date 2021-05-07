import { createStore, useStore as bsaeUseStore, GetterTree } from "vuex"
import getters from './getters'
import loginModule from './modules/login/index'
import userModule from './modules/user/index'
import permissionsModule from './modules/permissions/index'
import AllStateTypes, { key, RootState } from './interface-types'

const store = createStore<RootState>({
  state: {
    count: 0
  },
  // @ts-ignore
  getters,
  modules: {
    loginModule,
    userModule,
    permissionsModule
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// Simplifying useStore usage
export function useStore<T = AllStateTypes>() {
  return bsaeUseStore<T>(key)
}

export default store
