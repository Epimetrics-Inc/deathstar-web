import Vuex from 'vuex'
import Vue from 'vue'

import login from './modules/login'
import sign from './modules/sign'
import tasks from './modules/tasks'

Vue.use(Vuex)

const state = {
  webappName: "Policy Miner"
}

export default new Vuex.Store({
  state,
  modules: {
    login,
    sign,
    tasks
  },
  strict: process.env.NODE_ENV !== 'production'
})
