'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.view('./templates/index.hbs', { name: 'Abdul' })
  })

  fastify.get('/about', async function (request, reply) {
    const { rows } = await fastify.pg.query('SELECT * FROM users LIMIT 1') // we are adding a query to give us 1 result
    
    // const results = await fastify.....
    // const rows = results.row
    // our line extracts the rows properties in one step. This is called object destructuring in JavaScript
    
    const [user] = rows // assign that value to user variable
    
    // const user = rows[0]

    return reply.view('./templates/about.hbs', { user })
  })

  fastify.get('/contact', async function (request, reply) {
    return reply.view('./templates/contact.hbs', { name: 'Abdul' })
  })
}