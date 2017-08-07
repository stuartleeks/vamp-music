import * as types from '../mutation-types'
import http from '../../services/http'
import Vue from 'Vue'

const state = {
  songs: [],
  currentTrack: { title: '', artist: '' },
  globalPlaying: false
}

const getters = {
  songs: state => {
    return state.songs
  },
  currentTrack: state => {
    return state.currentTrack
  },
  globalPlaying: state => {
    return state.globalPlaying
  }
}

const mutations = {
  [types.SET_SONGS] (state, songs) {
    state.songs = songs
  },
  [types.PLAY_SONG] (state, trackId) {
    const index = state.songs.findIndex(song => song.track_id === trackId)
    const selectedSong = Object.assign({}, state.songs[index])
    selectedSong.playing = !state.songs[index].playing || false
    state.globalPlaying = !state.globalPlaying
    state.currentTrack = state.songs[index]

    for (let song of state.songs) {
      song.playing = false
    }
    Vue.set(state.songs, index, selectedSong)
  },
  [types.TOGGLE_GLOBAL_PLAY] (state) {
    state.globalPlaying = !state.globalPlaying
  }
}

const actions = {
  getRecommendedSongs ({ commit }) {
    http.get('/recommended')
      .then(res => {
        commit(types.SET_SONGS, res.data)
      })
      .catch(err => {
        this.error = err && err.response ? err.response : ''
      })
  },
  getSongsByTag ({ commit }, tag) {
    http.get(`/songs/tags/${tag}`)
      .then(res => {
        commit(types.SET_SONGS, res.data)
      })
      .catch(err => {
        this.error = err && err.response ? err.response : ''
      })
  },
  getSongsByArtist ({ commit }, artist) {
    http.get(`/songs/${artist}`)
      .then(res => {
        commit(types.SET_SONGS, res.data)
      })
      .catch(err => {
        this.error = err && err.response ? err.response : ''
      })
  },
  togglePlay ({ dispatch, commit }, trackId) {
    dispatch('storeEvent', { event: 'songs:play', payload: { trackId } })
    commit(types.PLAY_SONG, trackId)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
