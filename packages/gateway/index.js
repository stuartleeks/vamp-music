const Hapi = require('hapi')
const config = require('config')
const axios = require('axios')
const auth = config.services.auth

let server = new Hapi.Server()

server.connection({
  host: config.bind || '0.0.0.0',
  port: config.port || 3000,
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

const loggingOptions = {
  ops: false,
  reporters: {
    console: [{
      module: 'good-console'
    }, 'stdout']
  }
}


server.ext('onPostAuth', setCurrentUser)

server = addAuth(server)

function setCurrentUser (request, reply) {
  if (request.auth.isAuthenticated) {
    request.currentUser = request.auth.credentials.email
  }
  return reply.continue()
}

function addAuth (server) {

  server.register(require('./auth'), (err) => {
    if (err) throw err
    server.auth.strategy('token', 'token', { validateFunc: validate })
    server.auth.default({
      strategy: 'token'
    })
  })
  return server
}

const validate = (request, token, cb) => {
  axios.get(`http://${auth.host}:${auth.port}/validate/${token}`)
    .then(res => {
      cb(null, true, { email: res.data })
    })
    .catch(err => {
      if(err.response && err.response.status === 404) {
        cb(null, false)
      } else {
        cb(err, false)
      }
    })
}

server.register([require('./gateway'), require('h2o2'), {
  register: require('good'),
  options: loggingOptions
}], (err) => {
  if (err) throw err
  server.start(err => {
    if (err) throw err
    console.info('Server running at:', server.info.uri)
  })
})
