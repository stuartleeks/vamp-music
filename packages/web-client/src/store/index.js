import Vue from 'vue'
import Vuex from 'vuex'
import songs from './modules/songs'
import activity from './modules/activity'
import analytics from './modules/analytics'
import profile from './modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    songs,
    analytics,
    activity,
    profile
  }
})
