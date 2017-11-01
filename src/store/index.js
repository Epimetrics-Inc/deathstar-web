import Vuex from 'vuex'
import Vue from 'vue'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loginStatus: ''
  },
  mutations: {
    [LOGIN] (state) {
      state.loginStatus = 'pending'
    },
    [LOGIN_SUCCESS] (state) {
      state.loginStatus = 'success'
      state.isLoggedIn = true
    },
    [LOGIN_FAIL] (state) {
      state.loginStatus = 'fail'
      state.isLoggedIn = false
    },
    [LOGOUT] (state) {
      state.loginStatus = ''
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({ commit }, creds) {
      commit(LOGIN)
      setTimeout(function () {
        commit(LOGIN_SUCCESS)
      }, 2000)
    },
    logout ({ commit }) {
      commit(LOGOUT)
    }
  }
})
