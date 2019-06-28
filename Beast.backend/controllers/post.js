const postRouter = require('express').Router()
const Post = require('../models/Post')

postRouter.get('/all', async (request, response) => {
  const posts = Post.find({}).populate('user')
})

postRouter.get('/:id', (request, response) => {
  Post.findById(request.params.id).then(r => response.json(r))
    .catch(e => response.status(404).send('Post not found!'))
})

postRouter.post('/', async (request, response) => {
  const post = new Post(request.body)
  await post.save()

  response.status(204)
})