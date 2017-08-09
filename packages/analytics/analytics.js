const mongoose = require('mongoose')
const config = require('config')
const routes = [
  {
    method: 'GET',
    path: '/events',
    config: {
      handler: getEvents
    }
  },
  {
    method: 'POST',
    path: '/events',
    config: {
      handler: storeEvent
    }
  }
]

function getEvents (request, reply) {
  const skip = parseInt(request.query.skip) || 0
  const limit = parseInt(request.query.limit) || 10

  Analytics.find().limit(limit).skip(skip).sort('-timestamp').lean()
    .then(res => {
      reply(res)
    })
    .catch(err => {
      return reply(err)
    })
}

function storeEvent (request, reply) {
  Analytics.create(request.payload)
    .then(res => reply(res))
    .catch(err => reply(err))
}

mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${config.db.mongoHost}`)
})

mongoose.connect(config.db.mongoUri, { useMongoClient: true },
  (err) => {
  if (err) console.error(err)
})

const Analytics = mongoose.model('Analytics', {
  event: String,
  payload: Object,
  user: String,
  timestamp: Date
})

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'analytics'
}
