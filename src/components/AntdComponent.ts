import { App } from 'vue'
import { Button, Input, Form } from 'ant-design-vue'
import { InstallOptions } from './types'

const defaultInstallOpt = {
  zIndex: 1000,
}

const AntdComponent = [
  Button,
  Input,
  Form
]

export default {
  // App 是 vue 的类型
  install: (app: App, options: InstallOptions = defaultInstallOpt ) => {
    AntdComponent.forEach(comp => {
      app.component(comp.name, comp)
    })
  }
}

