const SIGNLIST = 'SIGNLIST'

import { getSignList } from '@/api/api'

const state = {
  signList: ['']
}

const mutations = {
  [SIGNLIST] (state, {signList}) {
    state.signList = signList
  }
}
const actions = {
  initSignList ({ commit }) {
    getSignList().then(res => {
      let signList = [...new Set(res.data.map(obj =>
        obj.sign === null ? null : obj.sign
      ))]
      signList = signList.filter(n => n)
      commit(SIGNLIST, { signList })
    }, (err) => {
      console.log(err)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
