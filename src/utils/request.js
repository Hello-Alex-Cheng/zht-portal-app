import axios from 'axios'
import { getToken } from './auth'
import defaultConfig from '@/configs'
// import { message } from 'ant-design-vue'
const timeout = 60 // 秒

// 创建axios实例
const service = axios.create({
  baseURL: defaultConfig.zhtApiUrl, // api 的 base_url
  // method: 'POST',
  // withCredentials: true,
  timeout: timeout * 1000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      const TOKEN = getToken()
      config.headers.Authorization = 'Bearer ' + TOKEN
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log('res ', res)
  },
  error => {
    console.log('response error', error)
  }
)

export default service
