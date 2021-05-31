import request from '@/utils/request'
import configs from '../configs'

export const portalLogin = (type: string, user: string, psw: string) => {
  const isMobile = type === 'zht_password' ? false : true
  const params = {
    grant_type: 'social',
    scope: 'server',
    type,
    [isMobile ? 'socialId' : 'username']: user,
    [isMobile ? 'code' : 'password']: psw
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

// 获取手机验证码
export const portalSendCodeSms = (
  phone: string,
  type = 5
) => request({
  method: 'POST',
  url: '/zhtSysUser/noauth/sendCode?phone=' + phone + '&type=' + type,
  data: {}
})

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

// 忘记密码 重置密码
export const resetPassword = (data: { id: string, password: string }) => {
  return request({
    method: 'POST',
    url: '/zhtSysUser/noauth/resetPassword',
    data
  })
}
