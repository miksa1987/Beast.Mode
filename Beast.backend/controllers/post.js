const postRouter = require('express').Router()
const config = require('../util/config')
const Post = require('../models/Post')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { imgparser, cloudinary } = require('../util/imageupload')

postRouter.get('/all', async (request, response) => {
  try {
    const posts = await Post.find({}).populate('user')
    response.status(200).json(posts)
  } catch(error) {
    response.status(404).end()
  }
})

postRouter.get('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id).populate('user')
    response.status(200).json(post)
  } catch(error) {
    response.status(404).send('Post not found')
  }
})

postRouter.put('/:id', async (request, response) => {
  if(!request.token) {
    response.status(401).end()
  }
  if(!request.body.content) {
    response.status(400).send('New content missing')
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const post = await Post.findById(request.params.id)
    
    const moddedPost = { 
      __v: post.__v,
      _id: post._id,
      type: post.type,
      picture: post.picture,
      pictureThumb: post.pictureThumb, 
      user: post.user, 
      likes: post.likes, 
      comments: post.comments, 
      date: post.date, 
      content: request.body.content 
    }

    const result = await Post.findByIdAndUpdate(request.params.id, moddedPost, { new: true })
    
    response.status(200).json(result)
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
})

postRouter.post('/new', imgparser.single('image'), async (request, response, next) => {
  if(!request.token) {
    response.status(401).end()
  }
  if(!(request.body.content)) {
    response.status(400).send('Content missing')
  }
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    request.body.file ?
      await cloudinary.uploader.upload_stream(request.file.buffer, { resource_type: 'raw' }).end(request.file.buffer)
      : null
    const post = new Post({
      content: request.body.content,
      picture: request.file ? request.file.secure_url : '',
      pictureThumb: request.file ? request.file.secure_url : '', // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likes: 0,
      comments: [],
      date: new Date()
    })
    await post.save()

    response.status(201).json(post)
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
  
})

postRouter.post('/:id/comment', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      response.status(401).end()
    }
    if(!post) {
      response.status(400).end()
    }

    const newComments = post.comments.concat({ content: request.body.comment, user: decodedToken.username })
    console.log(newComments)
    const postToUpdate = {
      content: post.content,
      picture: post.picture,
      pictureThumb: post.pictureThumb,
      type: post.type,
      user: post.user,
      likes: post.likes,
      date: post.date, 
      comments: newComments
    }
    console.log(postToUpdate)
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, postToUpdate, { new: true })
    console.log(updatedPost)
    response.json(post)
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
})

module.exports = postRouter 