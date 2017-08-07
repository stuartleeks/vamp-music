import Vue from 'vue'
import Vuex from 'vuex'
import songs from './modules/songs'
import analytics from './modules/analytics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    songs,
    analytics
  }
})
