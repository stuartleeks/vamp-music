const Boom = require('boom')
const Hoek = require('hoek')

const internals = {}

exports.register =  (plugin, options, next) => {
  plugin.auth.scheme('token', internals.implementation)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}

internals.implementation = (server, options) => {
  Hoek.assert(typeof options.validateFunc === 'function', 'options.validateFunc must be a valid function in basic scheme')

  const settings = Hoek.clone(options)
  const scheme = {
    authenticate: function (request, reply) {

      const req = request.raw.req;
      const token = request.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : null
      if (!token) {
        return reply(Boom.unauthorized(null, 'Token', settings.unauthorizedAttributes))
      }

      settings.validateFunc(request, token, (err, isValid, credentials) => {
        credentials = credentials || null

        if (err) {
          return reply(err, null, { credentials: credentials })
        }

        if (!isValid) {
          return reply(Boom.unauthorized())
        }

        if (!credentials ||
          typeof credentials !== 'object') {
          return reply(Boom.badImplementation('Bad credentials object received for token auth validation'))
        }

        // Authenticated
        return reply.continue({ credentials: credentials })
      })
    }
  }
  return scheme
}
