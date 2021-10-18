'use strict'

const marked = require('marked')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let { rows: posts } = await fastify.pg.query( // returns the posts from the blog
      'SELECT title, description, content FROM posts ORDER BY created_at DESC LIMIT 10'
    )

    // Convert posts to Markdown
    posts = posts.map(post => {
      post.content = marked(post.content)
      return post
    })

    return reply.view('./templates/posts.hbs', { posts })
  })

  fastify.get('/new', async function (request, reply) { // allows users to create new posts
    return reply.view('./templates/new.hbs')
  })

  fastify.post('/new', async function (request, reply) { // .post saves the information into the database
    const { title, description, content } = request.body // gets data from request.body
    const { rows } = await fastify.pg.query('SELECT id FROM users LIMIT 1')
    const [user] = rows

    await fastify.pg.query(
      'INSERT INTO posts (user_id, title, description, content, created_at) VALUES ($1, $2, $3, $4, now())',
      [user.id, title, description, content]
    )

    return reply.redirect('/posts')
  })
}
