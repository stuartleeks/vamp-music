/* global GLOBAL_CONFIG */

import axios from 'axios'
import bus from './bus'

class Http {

  constructor () {
    axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':3000' || GLOBAL_CONFIG.env.apiHost
    console.log(axios.defaults.baseURL)
    // add auth
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${this.getAccessToken()}`
      return config
    })

    axios.interceptors.response.use(response => {
      return response
    }, error => {
      if (error.response.status === 401) {
        bus.$emit('errors:401')
        return Promise.reject()
      }
      return Promise.reject(error)
    })
  }

  getAccessToken () {
    return localStorage.getItem('vamp_music_token')
  }

  request (method, url, data, successCb = null, errorCb = null) {
    return axios.request({
      url,
      data,
      method: method.toLowerCase()
    })
  }

  get (url, successCb = null, errorCb = null) {
    return this.request('get', url, {}, successCb, errorCb)
  }

  post (url, data, successCb = null, errorCb = null) {
    return this.request('post', url, data, successCb, errorCb)
  }

  put (url, data, successCb = null, errorCb = null) {
    return this.request('put', url, data, successCb, errorCb)
  }

  delete (url, data = {}, successCb = null, errorCb = null) {
    return this.request('delete', url, data, successCb, errorCb)
  }
}

export default new Http()
