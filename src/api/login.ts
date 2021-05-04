import request from '@/utils/request'
import configs from '../configs'

export const portalLogin = (type: string, username: string, password: string) => {
  const params = {
    grant_type: 'social',
    scope: 'server',
    type,
    username,
    password
  }
  return request({
    method: 'POST',
    headers: {
      Authorization: 'Basic dG91cjp0b3Vy'
    },
    url: configs.loginAprUrl,
    params
  })
}

// 获取用户详情
export const getUserMenuInfo = () => {
  return request({
    method: 'GET',
    url: '/zhtSysUser/_loady_user_info'
  })
}

// 获取用户详情
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/zhtSysUser/_loady_user'
  })
}
