const postRouter = require('express').Router()
const Post = require('../models/Post')
const io = require('../service/io')

postRouter.get('/all', async (request, response) => {
  try {
    const posts = await Post.find({}).populate('user')
    response.json(posts)
  } catch(error) {
    response.status(404).end()
  }
})

postRouter.get('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id).populate('user')
    response.json(post)
  } catch(error) {
    response.status(404).send('Post not found')
  }
})

postRouter.post('/', async (request, response, next) => {
  const post = new Post(request.body)
  await post.save()
  response.io.emit('newpost', post)

  response.status(204).end()
})

module.exports = postRouter