import { App } from 'vue'
import { Button, Input, Form, Layout, Breadcrumb, Menu } from 'ant-design-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { InstallOptions } from './types'

// 使用 iconfont 图标
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2299454_fvw4ct8o61.js'
})

const defaultInstallOpt = {
  zIndex: 1000,
}

const AntdComponent = [
  Button,
  Input,
  Form,
  Form.Item, // 没有直接导出 FormItem, FormItem 是和 Form 捆绑在一起导出的
  Layout,
  Layout.Header,
  Layout.Footer,
  Layout.Content,
  Layout.Sider,
  Breadcrumb,
  Breadcrumb.Item,
  Menu,
  Menu.Item,
  Menu.SubMenu,
  Menu.ItemGroup
]

export default {
  // App 是 vue 的类型
  install: (app: App, options: InstallOptions = defaultInstallOpt ) => {
    app.component('icon-font', IconFont)
    AntdComponent.forEach(comp => {
      app.component(comp.name, comp)
    })
  }
}

