export default [
  {
    name: 'Home',
    path: '/home',
    component: 'Layouts',
    children: [
      { path: '', name: '', component: 'Home' }
    ]
  },
  {
    name: 'Iconfont',
    path: '/iconfont',
    redirect: '/iconfont/base',
    component: 'Layouts',
    children: [
      { path: 'base', name: 'IconfontBase', component: 'IconfontBase' }
    ]
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