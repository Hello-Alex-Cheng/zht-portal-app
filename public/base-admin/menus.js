export default [
  {
    appId: 1,
    appInstructions: '基础模块',
    path: '/',
    appPrefix: '/zht-base-admin',
    homePath: '/subapp/zht-base-admin/index.html',
    appIcon: '',
    appMenus: [
      {
        id: 1,
        appId: 1,
        path: '/home',
        menuName: '首页',
        menuIcon: '',
        childMenus: [],
        hidden: true,
        whitelist: 0
      },
      {
        id: 2,
        appId: 1,
        path: '/iconfont',
        menuName: 'iconfont',
        menuIcon: '',
        childMenus: [
          {
            id: 4,
            appId: 1,
            path: '/iconfont/base',
            menuName: '基础使用',
            menuIcon: '',
            hidden: true,
            whitelist: 0
          }
        ],
        hidden: true,
        whitelist: 0
      },
      {
        id: 3,
        appId: 1,
        path: '/store',
        menuName: 'store',
        menuIcon: '',
        childMenus: [
          {
            id: 5,
            appId: 1,
            path: '/store/base',
            menuName: '基础使用',
            menuIcon: '',
            hidden: true,
            whitelist: 0
          }
        ],
        hidden: true,
        whitelist: 0
      },
    ]
  },
  {
    appId: 2,
    appInstructions: '基础Vue模块',
    path: '/vue-base',
    appPrefix: '/vue-base',
    homePath: '/subapp/vue-base/index.html',
    appIcon: '',
    appMenus: [
      {
        id: 1,
        appId: 2,
        path: '/vue-base/home',
        menuName: '首页',
        menuIcon: '',
        childMenus: [],
        hidden: true,
        whitelist: 0
      },
      {
        id: 2,
        appId: 2,
        path: '/vue-base/about',
        menuName: '关于',
        menuIcon: '',
        childMenus: [],
        hidden: true,
        whitelist: 0
      }
    ]
  }
]