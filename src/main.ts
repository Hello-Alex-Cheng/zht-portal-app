import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'

// 重新设置 html 样式
import 'normalize.css/normalize.css'
import 'ant-design-vue/dist/antd.css'

import { setupStore } from '@/store'
import { registerGlobComp } from './components/AntdComponent'
import { setupRouterGuard } from '@/router/guard'

(async () => {
  // 第二个参数是 props
  const app = createApp(App)

  // setup store
  setupStore(app)

  // 初始化内部系统配置

  // 注册全局组件
  registerGlobComp(app)

  // 路由配置
  setupRouter(app)

  // 路由守卫
  setupRouterGuard()

  // 注册全局指令

  // 配置全局错误处理函数

  // 当路由已经完成初始化导航，then mount app
  await router.isReady()

  // mount
  app.mount('#app')
})()
