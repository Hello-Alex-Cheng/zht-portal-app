export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'Home',
    path: '/home',
    component: 'Layouts',
    children: [
      { path: '', name: '', component: 'Home' }
    ],
    meta: {
      title: '首页',
      authRoles: ['admin', 'editor']
    }
  },
  {
    name: 'Iconfont',
    path: '/iconfont',
    redirect: '/iconfont/base',
    component: 'Layouts',
    children: [
      { path: 'base', name: 'IconfontBase', component: 'IconfontBase', meta: { title: 'iconfont图标' } }
    ],
    meta: {
      title: '图标',
      authRoles: ['admin', 'editor']
    }
  },
  {
    name: 'Store',
    path: '/store',
    redirect: '/store/base',
    component: 'Layouts',
    children: [
      { path: 'base', name: 'StoreBase', component: 'StoreBase' }
    ]
  },
  {
    name: 'VueApp',
    path: '/vue-base',
    component: 'Layouts',
    children: [
      { path: 'home', name: 'VueAppHome', component: 'RouterView' },
      { path: 'about', name: 'VueAppAbout', component: 'RouterView' },
    ]
  }
]