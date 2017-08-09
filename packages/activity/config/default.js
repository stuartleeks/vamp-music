const config = {}
const services = config.services = {}

config.bind = '0.0.0.0'
config.port = 3007

services.analytics = {
  host: process.env.SERVICES_ANALYTICS_HOST || '127.0.0.1',
  port: process.env.SERVICES_ANALYTICS_PORT || 3006
}


services.songs = {
  host: process.env.SERVICES_SONGS_HOST || '127.0.0.1',
  port: process.env.SERVICES_SONGS_PORT || 3004
}

services.profile = {
  host: process.env.SERVICES_PROFILE_HOST || '127.0.0.1',
  port: process.env.SERVICES_PROFILE_PORT || 3002
}


module.exports = config
