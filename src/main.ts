import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

// 重新设置 html 样式
import 'normalize.css/normalize.css'

import 'ant-design-vue/dist/antd.css'
// 注册所有需要的 antd component
import AntdComponent from './components/AntdComponent'

import './permissions'

// 第二个参数是 props
const Vue = createApp(
  App
)
.use(AntdComponent)
.use(router)
.mount('#app')
