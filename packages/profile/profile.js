const mongoose = require('mongoose')
const config = require('config')
const fs = require('fs')
const axios = require('axios')
const avatarCache = new Map()

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
    const promises = []
    const email = request.params.email
    let profile
    let fetchAvatar
    const fetchProfile = Profile.findOne({ email }).lean()

    if (avatarCache.get(email)) {
      fetchAvatar = Promise.resolve({ data: { results: [{ picture: { thumbnail: avatarCache.get(email)}}]}})
    } else {
      fetchAvatar = axios.get(`https://randomuser.me/api/?seed=${request.params.email}&inc=picture`)
    }

    fetchProfile
      .then(res =>  {
        if (!res) return reply({ message: 'no profile found' }).code(404)
        profile = res
        return fetchAvatar
      })
      .then(res => {
        avatarCache.set(email, res.data.results[0].picture.thumbnail)
        profile.avatar = res.data.results[0].picture.thumbnail
        reply(profile)
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
