import Vuex from 'vuex'
import Vue from 'vue'

import { getSignList } from '@/api/api'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'
const SIGNLIST = 'SIGNLIST'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loginStatus: '',
    signList: ['']
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
    },
    [SIGNLIST] (state, {signList}) {
      state.signList = signList
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
    },
    initSignList ({ commit }) {
      getSignList().then(res => {
        let signList = [...new Set(res.data.map(obj =>
          obj.sign === null ? null : obj.sign
        ))]
        console.log(signList)
        signList = signList.filter(n => n)
        commit(SIGNLIST, { signList })
      }, (err) => {
        console.log(err)
      })
    }
  }
})
