const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'

const state = {
  isLoggedIn: false,
  loginStatus: ''
}

const mutations = {
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
}
const actions = {
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

export default {
  state,
  actions,
  mutations
}
