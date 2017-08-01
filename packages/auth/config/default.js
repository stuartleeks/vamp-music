const config = {}
const db = config.db = {}

config.bind = '0.0.0.0'
config.port = 3001
config.tokenTimeout = 600 // seconds

db.mongoHost = process.env.MONGO_HOST || 'localhost'
db.mongoPort = process.env.MONGO_PORT || '27017'
db.mongoDb = process.env.MONGO_DB || 'auth'
db.mongoUri = `mongodb://${db.mongoHost}:${db.mongoPort}/${db.mongoDb}`

db.redisHost = process.env.REDIS_HOST || '127.0.0.1'
db.redisPort = process.env.REDIS_PORT || 6379

module.exports = config
