import { App } from 'vue'
import { Button,
  Input,
  Form,
  Layout,
  Breadcrumb,
  Menu,
  message,
  Select,
  Pagination,
  Row,
  Col,
  Tabs,
  Checkbox,
  Divider,
  Modal
} from 'ant-design-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

// 使用 iconfont 图标
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2299454_fvw4ct8o61.js'
})

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
  Menu.ItemGroup,
  Select,
  Pagination,
  Row,
  Col,
  Tabs,
  Tabs.TabPane,
  Checkbox,
  Divider,
  Modal
]

const installOtherComponents = (app: App): void => {
  app.component('icon-font', IconFont)

  // 同时支持 composition api 和 options api 方式
  app.provide('message', message)
  app.config.globalProperties.$message = message
}

export function registerGlobComp(app: App) {
  installOtherComponents(app)

  AntdComponent.forEach(comp => {
    app.component(comp.name || comp.displayName, comp)
  })
}

