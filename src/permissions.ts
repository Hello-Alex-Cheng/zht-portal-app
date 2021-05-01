import router from '@/router'
import { getToken } from './utils/auth'

const whiteList = ['/portal-error404', '/portal-error401', '/portal-error500']

router.beforeEach((to, from, next) => {
  const token = getToken()
  const isWhite = whiteList.find(w => w === to.path)
  if (token) {
    if (isWhite) {
      next()
    } else if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (isWhite) {
      next()
    } else if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})
