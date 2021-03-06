import axios from 'axios'
import { getToken } from './auth'
import defaultConfig from '@/configs'
import { message } from 'ant-design-vue'
import router from '@/router'
const timeout = 30 // 秒


const service = axios.create({
  baseURL: defaultConfig.zhtApiUrl,
  // method: 'POST',
  // withCredentials: true,
  timeout: timeout * 1000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (!config!.url!.includes('auth/social/token')) {
      const TOKEN = getToken()
      if (TOKEN) {
        config.headers.Authorization = TOKEN
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { url: apiUrl } = response.config
    const { status, statusText, data } = response
    if (status === 200) {
      if (apiUrl!.includes('auth/social/token')) {
        // 获取 user token 的接口，返回格式跟其它接口有区别，
        return {
          code: 0,
          msg: 'success',
          data
        }
      } else {
        return data
      }
    } else {
      // 报错
      message.error(`接口似乎出错了哦! status: ${status} - statusText: ${statusText}`)
      return Promise.reject({
        code: 1,
        msg: statusText
      })
    }
  },
  error => {
    // 如果是 403 就没有 error.response 属性了
    // { response, message, request, config } = error
    if (error.response) {
      const { status, statusText, data } = error.response
      if (status === 401) {
        message.error(`接口没有权限访问，请检查接口或者参数! status: ${status} - statusText: ${data.message}.`)
        // router.push('/portal-error401')
      } else if (status === 500) {
        message.error(`哦豁崩了，请检查接口或服务器状态! status: ${status} - statusText: ${statusText}.`)
        router.push('/portal-error500')
      } else {
        message.error(`出错啦! message: ${error.message} - statusText: ${statusText}.`)
      }
    } else {
      message.error(`禁止访问! 错误信息： ${error}`)
    }
  }
)

export default service
