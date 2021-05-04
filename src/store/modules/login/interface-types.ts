
export interface ApplicationType {
  id: number
  appId: number
  path: string
  menuName: string
  childMenu: Array<ApplicationType>
  [propName:string]: any
}

export default interface LoginModuleTypes {
  applitions: Array<ApplicationType>
}
