import Vue from 'vue'
import Vuex from 'vuex'
import { requestUserInfo } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      permissions: [],
      accessMenu: []
    },
    source: {
      token: null,
      cancel: null
    }
  },
  mutations: {
    setUser (state, { user }) {
      console.log(1111111111)
      state.user.name = user.name
      state.user.permissions = user.permissions
      state.user.accessMenu = user.accessMenu
    },
    deleteUser (state) {
      state.user.name = ''
      state.user.permissions = []
      state.user.accessMenu = []
    },
    updateSource (state, { source }) {
      state.source = source
    }
  },
  actions: {
    requestUserInfo ({ commit }) {
      return requestUserInfo().then(user => {
        console.log(1111111111)
        commit('setUser', { user })
      })
    }
  }
})
