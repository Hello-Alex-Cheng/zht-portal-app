import router from '@/router'
import { getToken } from './utils/auth'

router.beforeEach((to, from, next) => {
  const token = getToken()

  if (token) {
    if (to.path === '/login') next('/')
    else next()
  } else {
    if (to.path !== '/login') next('/login')
    else next()
  }
})
