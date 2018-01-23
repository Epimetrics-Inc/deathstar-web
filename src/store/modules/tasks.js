import Vue from 'vue'

const ADDTASK = 'ADD_TASK'
const SETTASKPROGRESS = 'SET_TASK_PROGRESS'
const SETTASKNAME = 'SET_TASK_NAME'

const state = {
  taskList: {
    0 : {
      progress: 30,
      name: 'Zipping 32 files',
    },
    1 : {
      progress: 50,
      name: 'Zipping 10 files',
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
  }
}
const actions = {
  addTask ({ commit }, task) {
    commit(ADDTASK, { task })
  },
  setTaskProgress ({ commit }, {task, progress}) {
    commit(SETTASKPROGRESS, { task, progress })
  },
  setTaskName ({ commit }, {task, name}) {
    commit(SETTASKNAME, { task, name })
  },
}

export default {
  state,
  actions,
  mutations
}
