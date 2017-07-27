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

const validate = function (request, username, password, callback) {

  const user = users[username];
  if (!user) {
    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, (err, isValid) => {

    callback(err, isValid, { id: user.id, name: user.name });
  })
}

server.register([require('./charts.js'),{
  register: require('good'),
  options: loggingOptions
}], (err) => {
  if (err) throw err
  server.start(err => {
    if (err) throw err
    console.info('Server running at:', server.info.uri)
  })
})
