import http from '../../services/http'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  storeEvent ({ commit }, event) {
    http.post('/analytics', event)
      .then(() => {})
      .catch(err => console.error(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
