import Vue from 'vue'
import Router from 'vue-router'
import staticRouter from './staticRouter' // 模块化--静态页面路由
// import { whiteList } from './whiteList'
// import store from '@/store/index'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: staticRouter
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
