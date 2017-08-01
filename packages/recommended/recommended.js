const config = require('config')
const fs = require('fs')
const axios = require('axios')
const songs = config.services.songs

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: find
    }
  }
]

function find (request, reply) {
  const promises = []
  for(let i=1; i <= 10; i++) {
    const skip = Math.ceil(Math.random() * 9000)
    promises.push(axios.get(`http://${songs.host}:${songs.port}/?limit=1&skip=${skip}`))
  }
  Promise.all(promises)
    .then(res => {
      reply(res.map(song => { return song.data[0] }))
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
  name: 'recommended'
}
