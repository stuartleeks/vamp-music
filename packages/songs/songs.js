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
    path: '/{trackId}',
    config: {
      handler: findOne
    }
  }
]

function find (request, reply) {
  Song.find().limit(20).lean()
    .then(res =>  {
      if (!res) return reply({ message: 'no songs found' }).code(404)
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
      unzipSongData(() => {
        const mockData = readSongData()
        Song.insertMany(mockData, (err) =>{
          if (err) console.error(err)
        })
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
  timestamp: Date,
  similars: [[mongoose.Schema.Types.Mixed]],
  tags: [[String]]
})

function unzipSongData (cb) {
  if(!fs.existsSync('./data/lastfm_subset/A')) {
    console.log('unzipping song data')
    fs.createReadStream('./data/lastfm_subset.zip')
      .pipe(unzip.Extract({ path: './data' }))
      .on('close', cb)
  } else {
    console.log('song data already unzipped')
    cb()
  }
}

function readSongData () {
  const files = glob.sync('./data/lastfm_subset/**/*.json')
  const songs = []
  for(file of files) {
    const song = JSON.parse(fs.readFileSync(file))
    songs.push(song)
  }
  console.log(`read ${songs.length} songs`)
  return songs
}

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'songs'
}
