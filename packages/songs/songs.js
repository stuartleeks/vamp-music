const mongoose = require('mongoose')
const config = require('config')
const glob = require('glob')
const fs = require('fs')
const unzip = require('unzip')

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: find
    }
  },
  {
    method: 'GET',
    path: '/tags/{tag}',
    config: {
      handler: findbyTag
    }
  },
  {
    method: 'GET',
    path: '/{trackId}',
    config: {
      handler: findOne
    }
  }
]

function find (request, reply) {
  const skip = parseInt(request.query.skip) || 0
  const limit = parseInt(request.query.limit) || 20
  const artist = request.query.artist || ''

  const match = artist ? { artist } : {}

  Song.find(match).limit(limit).skip(skip).lean()
    .then(res =>  {
      if (!res) return reply({ message: 'no songs found' }).code(404)
      reply(res)
    })
    .catch(err => reply(err))
}

function findbyTag(request, reply) {
  const skip = parseInt(request.query.skip) || 0
  const limit = parseInt(request.query.limit) || 20

  Song.find({ tags:{"$elemMatch":{"$elemMatch": { "$in": [request.params.tag] }}}}).limit(limit).skip(skip).lean()
    .then(res =>  {
      if (!res) return reply({ message: 'no songs found with that tag' }).code(404)
      reply(res)
    })
    .catch(err => reply(err))
}

function findOne (request, reply) {
  if(request.params && request.params.trackId) {
    Song.findOne({ track_id: request.params.trackId }).lean()
      .then(res =>  {
        if (!res) return reply({ message: 'no song found' }).code(404)
        reply(res)
      })
      .catch(err => reply(err))
  } else {
    return reply({ message: 'please provide a track_id' }).code(400)
  }
}


mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${config.db.mongoHost}`)
  Song.find({}).exec((err, collection) => {
    if (collection.length === 0) {
      const mockData = fs.readFileSync('./data/songs.json')
      Song.insertMany(JSON.parse(mockData), (err) =>{
        if (err) console.error(err)
        console.info('Song insertion complete')
      })
    }
  })
})

mongoose.connect(config.db.mongoUri, { useMongoClient: true },
  (err) => {
  if (err) console.error(err)
})

const Song = mongoose.model('Song', {
  artist: String,
  title: String,
  track_id: { type: String, index: true },
  tags: [[String]]
})

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'songs'
}
