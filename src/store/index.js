import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import home from './modules/home'
import createLogger from 'vuex/dist/logger' // 控制台输出当前变化的某个状态

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production' // 生产或开发环境打包
export default new Vuex.Store({
  modules: {
    login,
    home
  },
  strict: debug, // 按照官网建议，改变state的状态只能通过setter
  plugins: debug ? [createLogger()] : []
})
