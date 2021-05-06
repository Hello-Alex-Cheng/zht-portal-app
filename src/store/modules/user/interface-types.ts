

export interface ApplicationType {
  id: number
  appId: number
  path: string
  menuName: string
  childMenu: Array<ApplicationType>
  [propName:string]: any
}

export default interface UserModuleTypes {
  name: string
  roles: Array<string>
  currentApp: ApplicationType
  applications: Array<ApplicationType>
  avatar?: string
  introduction?: string
}
