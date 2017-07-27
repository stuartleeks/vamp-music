const config = require('config')
const uuid = require('uuid')
const mongoose = require('mongoose')
const fs = require('fs')
const redis = require('node-redis').createClient({
  host: config.db.redisHost,
  port: config.db.redisPort
})

const routes = [
  {
    method: 'POST',
    path: '/authenticate',
    config: {
      handler: authenticate
    }
  },
  {
    method: 'GET',
    path: '/validate/{token}',
    config: {
      handler: validate
    }
  }
]

function authenticate (request, reply) {
  if(request.payload && request.payload.email && request.payload.password) {
    Auth.findOne({ email: request.payload.email }).lean()
      .then(res => {
        if (!res) return reply({ message: 'no account with that email found' }).code(404)
        const password = res.password
        if(res.password === request.payload.password) {
          const token = uuid.v4()
          redis.set(token, res.email, 'EX', config.tokenTimeout, (err, res) => {
            if (err) return reply(err)
            reply({ token })
          })
        } else {
         return reply({ message: 'password failed'}).code(401)
        }
      })
      .catch(err => {
       return reply(err)
    })
  } else {
    return reply({ message: 'please provide email and password' }).code(400)
  }
}


function validate (request, reply) {
  if(request.params && request.params.token) {
    redis.get(request.params.token, (err, res) => {
      if (err) return reply(err)
      res ? reply(res) : reply({ message: 'no such token found' }).code(404)
    })
  } else {
    return reply({ message: 'please provide a token' }).code(400)
  }
}

mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${config.db.mongoHost}`)
  Auth.find({}).exec((err, collection) => {
    if (collection.length === 0) {
      const mockData = JSON.parse(fs.readFileSync('data/MOCK_DATA.json', 'utf8'))
      Auth.insertMany(mockData, (err) =>{
        if (err) console.error(err)
      })
    }
  })
})

mongoose.connect(config.db.mongoUri, { useMongoClient: true },
  (err) => {
    if (err) console.error(err)
  })

const Auth = mongoose.model('Auth', {
  email: String,
  password: String
})

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'auth'
}
