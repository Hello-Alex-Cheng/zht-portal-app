import { Store } from "vuex"
import { InjectionKey } from "vue"
import LoginModuleTypes from "./modules/login/interface-types"
import userModuleTypes from "./modules/user/interface-types"
import permissionsModuleTypes from "./modules/permissions/interface-types"

// 定义存储状态的类型
export interface RootState {
  count: number
}

// 定义注入 key，为了在 .vue 组件中更好的类型推断
export const key: InjectionKey<Store<RootState>> = Symbol()

// 全量 state types
export default interface AllStateTypes extends RootState {
  loginModule: LoginModuleTypes,
  userModule: userModuleTypes,
  permissionsModule: permissionsModuleTypes
}
