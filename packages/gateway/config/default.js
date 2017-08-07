const config = {}
const db = config.db = {}
const services = config.services = {}

config.bind = '0.0.0.0'
config.port = 3000

// database
db.mongoHost = process.env.MONGO_HOST || 'localhost'
db.mongoPort = process.env.MONGO_PORT || '27017'
db.mongoDb = process.env.MONGO_DB || 'profile'
db.mongoUri = `mongodb://${db.mongoHost}:${db.mongoPort}/${db.mongoDb}`

// services
services.auth = {
  host: process.env.SERVICES_AUTH_HOST || '127.0.0.1',
  port: process.env.SERVICES_AUTH_PORT || 3001
}

services.profile = {
  host: process.env.SERVICES_PROFILE_HOST || '127.0.0.1',
  port: process.env.SERVICES_PROFILE_PORT || 3002
}

services.songs = {
  host: process.env.SERVICES_SONGS_HOST || '127.0.0.1',
  port: process.env.SERVICES_SONGS_PORT || 3004
}

services.recommended = {
  host: process.env.SERVICES_RECOMMENDED_HOST || '127.0.0.1',
  port: process.env.SERVICES_RECOMMENDED_PORT || 3005
}

services.analytics = {
  host: process.env.SERVICES_ANALYTICS_HOST || '127.0.0.1',
  port: process.env.SERVICES_ANALYTICS_PORT || 3006
}



module.exports = config
