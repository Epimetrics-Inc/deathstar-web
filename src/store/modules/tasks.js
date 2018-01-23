import Vue from 'vue'

const ADDTASK = 'ADD_TASK'
const SETTASKPROGRESS = 'SET_TASK_PROGRESS'
const SETTASKNAME = 'SET_TASK_NAME'
const SETTASKSTATUSDONE = "SET_TASK_STATUS_DONE"

const state = {
  taskList: {
    0 : {
      progress: 30,
      name: 'Zipping 32 files',
      status: 'pending'
    },
    1 : {
      progress: 50,
      name: 'Zipping 10 files',
      status: 'pending'
    },
  },
  currIndex: 2
}

const mutations = {
  [ADDTASK] (state, {task}) {
    Vue.set(state.taskList, state.currIndex, task)
    state.currIndex++
  },
  [SETTASKPROGRESS] (state, {task, progress}) {
    task.progress = progress
  },
  [SETTASKNAME] (state, {task, name}) {
    task.name = name
  },
  [SETTASKSTATUSDONE] (state, {task}) {
    task.status = 'done'
  }
}
const actions = {
  addTask ({ commit }, task) {
    commit(ADDTASK, { task })
  },
  setTaskProgress ({ commit }, {task, progress}) {
    commit(SETTASKPROGRESS, { task, progress })
  },
  setTozippingFile ({ commit }, {task, count}) {
    let zipString = 'Zipping ' + count + ' files'
    commit(SETTASKNAME, { task, name: zipString})
  },
  setToDoneZipping ({ commit }, task) {
    let zipString = 'Complete'
    commit(SETTASKNAME, { task, name: zipString})
    commit(SETTASKSTATUSDONE, {task})
  }
}

export default {
  state,
  actions,
  mutations
}
