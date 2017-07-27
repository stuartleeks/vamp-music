const config = require('config')
const fs = require('fs')

const routes = [
  {
    method: 'GET',
    path: '/{countryCode}',
    config: {
      handler: findOne
    }
  }
]

const charts = {
  NL: {
    pop: [1,2,3,4],
    dance: [5,6,7,8]
  },
  DE: {
    pop: [4,3,2,1],
    dance: [8,7,6,5]
  }
}

function findOne (request, reply) {
  if(request.params && request.params.countryCode) {
    if (charts.hasOwnProperty(request.params.countryCode)) {
      reply(charts[request.params.countryCode])
    } else {
      reply({ message: 'no charts found' }).code(404)
    }
  } else {
    return reply({ message: 'please provide a countryCode' }).code(400)
  }
}

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'charts'
}
