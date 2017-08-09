const config = require('config')
const axios = require('axios')

const auth = config.services.auth
const profile = config.services.profile
const analytics = config.services.analytics
const songs = config.services.songs
const recommended = config.services.recommended
const activity = config.services.activity


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
    path: '/recommended',
    config: {
      handler: getRecommended
    }
  },
  {
    method: 'GET',
    path: '/songs/{artist}',
    config: {
      handler: getSongsByArtist
    }
  },
  {
    method: 'GET',
    path: '/songs/tags/{tag}',
    config: {
      handler: getSongByTag
    }
  },
  {
    method: 'POST',
    path: '/analytics',
    config: {
      handler: postEvents
    }
  },
  {
    method: 'GET',
    path: '/activity',
    config: {
      handler: getActivity
    }
  },
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

function getSongsByArtist (request, reply) {
  axios.get(`http://${songs.host}:${songs.port}/?artist=${request.params.artist}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

function getSongByTag (request, reply) {
  axios.get(`http://${songs.host}:${songs.port}/tags/${request.params.tag}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

function getRecommended (request, reply) {
  axios.get(`http://${recommended.host}:${recommended.port}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

function postEvents (request, reply) {
  const event = {
    event: request.payload.event,
    payload: request.payload.payload,
    timestamp: Date.now(),
    user: request.currentUser
  }

  axios.post(`http://${analytics.host}:${analytics.port}/events`, event)
    .then(res => {
      reply().code(201)
    })
    .catch(err => {
      reply(err)
    })
}


function getActivity (request, reply) {
  axios.get(`http://${activity.host}:${activity.port}/${request.currentUser}`)
    .then(res => {
      reply(res.data)
    })
    .catch(err => {
      reply(err)
    })
}

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'gateway'
}
