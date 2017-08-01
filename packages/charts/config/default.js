const config = {}
const db = config.db = {}

config.bind = '0.0.0.0'
config.port = 3003

// database
db.mongoHost = process.env.MONGO_HOST || 'localhost'
db.mongoPort = process.env.MONGO_PORT || '27017'
db.mongoDb = process.env.MONGO_DB || 'profile'
db.mongoUri = `mongodb://${db.mongoHost}:${db.mongoPort}/${db.mongoDb}`

module.exports = config
