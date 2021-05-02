import { registerMicroApps, setDefaultMountApp, addGlobalUncaughtErrorHandler, start } from "qiankun"

const apps = [
  {
    name: 'vue3-base', // 应用名称
    entry: '//localhost:8080', // 应用入口,资源路径
    container: '#subAppContainer', // 在主体中存放 子应用 的容器 id
    activeRule: '/vue-base', // 根据此规则切换指定子应用,激活规则
    props: {
      // 传递给子应用的数据
      user: {
        name: 'ZHONG TAI ADMIN',
        age: 18
      }
    }
  }
]

const excutorSingleSpa = () => {

  registerMicroApps(apps, {
    beforeLoad: [
      // @ts-ignore
      app => {
        console.log('加载应用之前打印apps', app)
      }
    ]
  })

  addGlobalUncaughtErrorHandler((event: Event | string) => {
    console.error(event)
    const { message: msg } = event as any
    // 加载失败时提示
    if (msg || msg.includes("died in status LOADING_SOURCE_CODE")) {
      console.error("微应用加载失败，请检查应用是否可运行", msg);
    }
  })

  start({
    // 是否开启预加载，默认为 true。
    // 配置为 true 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源
    prefetch: false,
    // boolean | { strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean
    sandbox: true
  })
}

export default excutorSingleSpa
