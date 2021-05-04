import { createStore, useStore as bsaeUseStore } from "vuex"
import loginModule from './modules/login/index'
import AllStateTypes, { key, RootState } from './interface-types'

const store = createStore<RootState>({
  state: {
    count: 0
  },
  modules: {
    loginModule: loginModule
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
