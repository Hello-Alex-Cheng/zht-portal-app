import router from '@/router'
import { getToken } from './utils/auth'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    // 白名单 ?
    next()
  }
})
