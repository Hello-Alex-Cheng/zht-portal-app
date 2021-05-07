import { GetterTree } from "vuex"
import AllStateTypes from './interface-types'
import { ApplicationType } from './modules/user/interface-types'

export type Getters = {
  roles(state: AllStateTypes): string[]
  currentApp(state: AllStateTypes): ApplicationType
}

const getters: GetterTree<AllStateTypes, AllStateTypes> & Getters = {
  roles: (state: AllStateTypes) => state.userModule.roles,
  currentApp: (state: AllStateTypes) => state.userModule.currentApp
}

export default getters
