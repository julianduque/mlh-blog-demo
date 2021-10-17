'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.view('./templates/index.hbs', { name: 'Abdul' })
  })

  fastify.get('/about', async function (request, reply) {
    const { rows } = await fastify.pg.query('SELECT * FROM users LIMIT 1')
    const [user] = rows
    return reply.view('./templates/about.hbs', { user })
  })

  fastify.get('/contact', async function (request, reply) {
    return reply.view('./templates/contact.hbs', { name: 'Abdul' })
  })
}