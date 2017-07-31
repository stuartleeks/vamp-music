const config = require('config')
const fs = require('fs')
const axios = require('axios')

const auth = config.services.auth
const profile = config.services.profile
const charts = config.services.charts
const songs = config.services.songs


const routes = [
  {
    method: 'POST',
    path: '/authenticate',
    config: {
      auth: false,
      handler: authenticate
    }
  },
  {
    method: 'GET',
    path: '/profile',
    config: {
      handler: getProfile
    }
  },
  {
    method: 'GET',
    path: '/songs',
    config: {
      handler: getSongs
    }
  },
  {
    method: 'GET',
    path: '/songs/{trackId}',
    config: {
      handler: getSong
    }
  },
  {
    method: 'GET',
    path: '/charts/{countryCode}',
    config: {
      auth: false,
      handler: getCharts
    }
  }
]

function authenticate (request, reply) {
  const payload = {
    email: request.payload.email,
    password: request.payload.password
  }

  axios.post(`http://${auth.host}:${auth.port}/authenticate`, payload)
    .then(res => {
      reply({ token: res.data.token })
    })
    .catch(err => {
      reply(err)
    })
}

function getProfile (request, reply) {
  axios.get(`http://${profile.host}:${profile.port}/${request.currentUser}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

function getSong (request, reply) {
  axios.get(`http://${songs.host}:${songs.port}/${request.trackId}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

function getSongs (request, reply) {
  axios.get(`http://${songs.host}:${songs.port}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

function getCharts (request, reply) {
  reply.proxy({
    uri: `http://${charts.host}:${charts.port}/{countryCode}`,
    passThrough: true
  })
}

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'gateway'
}
