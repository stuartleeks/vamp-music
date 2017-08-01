const config = {}
const services = config.services = {}

config.bind = '0.0.0.0'
config.port = 3005

services.songs = {
  host: process.env.SERVICES_SONGS_HOST || '127.0.0.1',
  port: process.env.SERVICES_SONGS_PORT || 3004
}

module.exports = config
