'use strict'

require('dotenv').config()
const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  // Register point-of-view plugin with handlebars engine
  fastify.register(require('point-of-view'), {
    engine: {
      handlebars: require('handlebars')
    },
    layout: './templates/layout.hbs',
    options: {
      partials: {
        header: './templates/partials/header.hbs',
        footer: './templates/partials/footer.hbs'
      }
    }
  })

  // Register fastify-static
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
  })

  // Register fastify-postgres
  fastify.register(require('fastify-postgres'), {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  // Register fastify-formbody
  fastify.register(require('fastify-formbody'))

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
