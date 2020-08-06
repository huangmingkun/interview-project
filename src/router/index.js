import Vue from 'vue'
import Router from 'vue-router'
import staticRouter from './staticRouter' // 模块化--静态页面路由

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: staticRouter
})

export default router
