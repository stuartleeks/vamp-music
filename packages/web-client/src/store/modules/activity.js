import * as types from '../mutation-types'
import http from '../../services/http'

const state = {
  activity: []
}

const getters = {
  activity: state => {
    return state.activity
  }
}

const mutations = {
  [types.SET_ACTIVITY] (state, activity) {
    state.activity = activity
  }
}

const actions = {
  getActivity ({ commit }) {
    http.get('/activity')
      .then(res => {
        commit(types.SET_ACTIVITY, res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
