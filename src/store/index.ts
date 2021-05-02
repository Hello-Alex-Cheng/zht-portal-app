import { InjectionKey } from "vue"
import { createStore, Store, useStore as bsaeUseStore } from "vuex"

// 定义存储状态的类型
export interface State {
  count: number
}

// 定义注入 key，为了在 .vue 组件中更好的类型推断
export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// Simplifying useStore usage
export function useStore() {
  return bsaeUseStore(key)
}

export default store
