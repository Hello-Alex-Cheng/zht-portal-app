
export type ChildRouteType= Array<RouteType>

export interface RouteType {
  name: string,
  path: string,
  component: string,
  redirect?: string,
  children?: ChildRouteType
}

export default interface PermissionsStateTypes {
  routes: Array<RouteType>
}
