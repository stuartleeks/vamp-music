const Hapi = require('hapi')
const config = require('config')

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

server.register([
  require('./auth'),
  {
    register: require('good'),
    options: loggingOptions
  }],
  (err) => {
  if (err) throw err
  server.start(err => {
    if (err) throw err
    console.info('Server running at:', server.info.uri)
  })
})
