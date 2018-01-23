import Vue from 'vue'

import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import StreamSaver from 'streamsaver'

const ADDTASK = 'ADD_TASK'
const SETTASKPROGRESS = 'SET_TASK_PROGRESS'
const SETTASKNAME = 'SET_TASK_NAME'
const SETTASKSTATUSDONE = "SET_TASK_STATUS_DONE"
const SETTASKSTATUSFAILED = "SET_TASK_STATUS_FAILED"

const state = {
  taskList: {},
  currIndex: 0
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
  },
  [SETTASKSTATUSFAILED] (state, {task}) {
    task.status = 'failed'
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
  },
  setErrorZipping ({ commit }, task) {
    let zipString = 'Error encountered'
    commit(SETTASKNAME, { task, name: zipString})
    commit(SETTASKSTATUSFAILED, {task})
  },
  startDownload ({commit, dispatch}, checkedDocs) {
    var zip = new JSZip()

    let count = 0
    let task = {
      name: 'Preparing files',
      progress: 0,
      status: 'pending',
    }
    
    dispatch('addTask', task)

    // adds file to zip
    var prepZip = (checkedDoc) => {
      JSZipUtils.getBinaryContent('../../static/pdfs/' + checkedDoc + '.pdf', (err, data) => {
        if (err) {
          dispatch('setErrorZipping', task)
        } else {
          var writeStream = StreamSaver.createWriteStream('output.zip').getWriter()
          zip.file(checkedDoc + '.pdf', data, {binary: true})
          count++

          // * 100 because percentage, / 2 because maximum of 50%
          dispatch('setTaskProgress', {task: task, progress: Math.floor(count * 100 / checkedDocs.length / 2)})

          if (count === checkedDocs.length) {
            dispatch('setTozippingFile', {task: task, count: count})

            zip
            .generateInternalStream({type: 'uint8array'})
            .on('data', (data, metadata) => {
              writeStream.write(data)

              dispatch('setTaskProgress', {task: task, progress: 50 + Math.floor(metadata.percent / 2)})
            })
            .on('error', function (e) {
              writeStream.abort(e)
              dispatch('setErrorZipping', task)
            })
            .on('end', () => {
              writeStream.close()
              dispatch('setToDoneZipping', task)
            })
            .resume()
          }
        }
      })
    }

    // loop and get each pdf selected
    for (let checkedDoc of checkedDocs) {
      prepZip(checkedDoc)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
