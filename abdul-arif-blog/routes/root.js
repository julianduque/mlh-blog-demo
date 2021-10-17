'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.view('./templates/index.hbs', {name: "Abdul's Awesome"})
  })
}
