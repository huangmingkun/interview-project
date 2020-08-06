/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    menu: true,
    name: 'layout',
    component: () => import('../views/layout/TheLayout'),
    children: [
      {
        path: '/index',
        name: 'index',
        title: 'menu.home',
        icon: 'el-icon-s-home',
        component: () => import('@/views/pages/PageHome')
      },
      {
        path: '/table',
        name: 'table',
        title: 'menu.table',
        icon: 'el-icon-search',
        component: () => import('@/views/pages/PageTable')
      },
      {
        path: '/forms',
        name: 'forms',
        title: 'menu.form',
        icon: 'el-icon-picture',
        component: () => import('@/views/pages/PageForm')
      },
      {
        path: '/charts',
        name: 'charts',
        title: 'menu.form',
        icon: 'el-icon-picture',
        component: () => import('@/views/test/select/SelectAndSearch')
      }
    ]
  }
]

export default staticRouter
