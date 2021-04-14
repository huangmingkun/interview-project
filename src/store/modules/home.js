import { requestUserInfo } from '@/api/user'
// import { Message } from 'element-ui'

const state = {
  user: {
    name: 'hmk',
    permissions: [],
    accessMenu: [
      {
        icon: 'el-icon-s-home',
        name: 'index',
        path: '/index',
        title: 'menu.home'
      },
      {
        icon: 'el-icon-search',
        name: 'table',
        path: '/table',
        title: 'menu.table'
      },
      {
        icon: 'el-icon-tickets',
        name: 'forms',
        path: '/forms',
        title: 'menu.form'
      },
      {
        icon: 'el-icon-picture',
        name: 'charts',
        path: '/charts',
        title: 'menu.chart'
      }
    ]
  },
  source: {
    token: null,
    cancel: null
  }
}

const mutations = {
  setUser (state, { user }) {
    console.log('mutations--user--666', user)
    state.user.name = user.name
    console.log('state.user--home', state.user)
  },
  deleteUser (state) {
    state.user.name = ''
    state.user.permissions = []
    state.user.accessMenu = []
  }
}

const actions = {
  requestUserInfo ({ commit }) {
    return requestUserInfo().then(user => {
      // console.log('接口获取user', user);
      commit('setUser', { user })
    })
  }
}

export default {
  // namescaped: true,
  state,
  mutations,
  actions
}
