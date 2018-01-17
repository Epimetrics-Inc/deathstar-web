import Vuex from 'vuex'
import Vue from 'vue'

import login from './modules/login'
import sign from './modules/sign'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    sign
  },
  strict: process.env.NODE_ENV !== 'production'
})
