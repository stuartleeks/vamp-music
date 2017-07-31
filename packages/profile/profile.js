const mongoose = require('mongoose')
const config = require('config')
const fs = require('fs')

const routes = [
  {
    method: 'GET',
    path: '/{email}',
    config: {
      handler: findOne
    }
  }
]

function findOne (request, reply) {
  if(request.params && request.params.email) {
    Profile.findOne({ email: request.params.email }).lean()
      .then(res =>  {
        if (!res) return reply({ message: 'no profile found' }).code(404)
        reply(res)
      })
      .catch(err => reply(err))
  } else {
    return reply({ message: 'please provide an email' }).code(400)
  }
}


mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${config.db.mongoHost}`)
  Profile.find({}).exec((err, collection) => {
    if (collection.length === 0) {
      console.log('Seeding profile data')
      const mockData = JSON.parse(fs.readFileSync('data/MOCK_DATA.json', 'utf8'))
      Profile.insertMany(mockData, (err) =>{
        if (err) console.error(err)
      })
    }
  })
})

mongoose.connect(config.db.mongoUri, { useMongoClient: true },
  (err) => {
  if (err) console.error(err)
})

const Profile = mongoose.model('Profile', {
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  ip_address: String,
  avatar: String
})

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'profile'
}
