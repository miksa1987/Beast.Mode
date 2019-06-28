const postRouter = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

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

postRouter.put('/:id', async (request, response) => {
  if(!request.body.token) {
    response.status(401).end()
  }
  if(!request.body.content) {
    response.status(400).send('New content missing')
  }

  try {
    const decodedToken = await jwt.verify(request.body.token, config.SECRET)
    const post = await Post.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if(!user || post.user !== user.id) {
      response.status(400).end()
    }

    const moddedPost = { ...post, content: request.body.content }
    const result = await Post.findByIdAndUpdate(request.params.id, moddedPost, { new: true })

    response.json(result)
  } catch(e) {
    response.status(400).send({ error: e.message })
  }
})

postRouter.post('/', async (request, response, next) => {
  if(!request.body.token) {
    response.status(401).end()
  }
  if(!(request.body.content)) {
    response.status(400).send('Content missing')
  }
  try {
    const decodedToken = await jwt.verify(request.body.token, config.SECRET)

    const post = new Post({
      content: request.body.content,
      picture: request.body.picture || '',
      user: decodedToken.id,
      likes: 0,
      comments: []
    })
    await post.save()
    response.io.emit('newpost', post)

    response.status(204).end()
  } catch(e) {
    response.status(400).send({ error: e.message })
  }
  
})

postRouter.post('/:id/comment', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    const decodedToken = await jwt.verify(request.body.token, config.SECRET)

    if(!decodedToken) {
      response.status(401).end()
    }
    if(!workout) {
      response.status(400).end()
    }

    post.comments = post.comments.concat({ content: request.body.comment, user: decodedToken.id })
    await post.save()

    response.json(post)
  } catch(e) {
    response.status(400).send({ error: e.message })
  }
})

module.exports = postRouter 