import * as types from '../mutation-types'
import http from '../../services/http'

const state = {
  profile: {}
}

const getters = {
  profile: state => {
    return state.profile
  }
}

const mutations = {
  [types.SET_PROFILE] (state, profile) {
    state.profile = profile
  }
}

const actions = {
  getProfile ({ commit }) {
    http.get('/profile')
      .then(res => {
        commit(types.SET_PROFILE, res.data)
        localStorage.setItem('vamp_music_profile', JSON.stringify(res.data))
      })
      .catch(err => {
        this.error = err && err.response ? err.response : ''
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
