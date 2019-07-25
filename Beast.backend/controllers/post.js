const postRouter = require('express').Router()
const config = require('../util/config')
const Post = require('../models/Post')
const User = require('../models/User')
const userUpdater = require('../util/userUpdater')
const jwt = require('jsonwebtoken')
const activityHelper = require('../util/activity')
const { imgparser, cloudinary } = require('../util/imageupload')
const sockets = require('../util/sockets')

postRouter.get('/all', async (request, response) => {
  try {
    const posts = await Post.find({}).populate('user')
    return response.status(200).json(posts)
  } catch(error) {
    return response.status(404).end()
  }
})

postRouter.get('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id).populate('user')
    return response.status(200).json(post)
  } catch(error) {
    return response.status(404).send('Post not found')
  }
})

postRouter.put('/:id', async (request, response) => {
  if(!request.token) {
    return response.status(401).end()
  }
  if(!request.body.content) {
    return response.status(400).send('New content missing')
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const post = await Post.findById(request.params.id)
    
    const moddedPost = { 
      ...post.toObject(),
      content: request.body.content 
    }

    const result = await Post.findByIdAndUpdate(request.params.id, moddedPost, { new: true })
    
    return response.status(200).json(result)
  } catch(error) {
    return response.status(400).json({ error: error.message })
  }
})

postRouter.post('/new', imgparser.single('image'), async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }
  if(!(request.body.content)) {
    return response.status(400).send('Content missing')
  }
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    
    if (request.file) {
      await cloudinary.uploader.upload_stream(request.file.buffer, { resource_type: 'raw' }).end(request.file.buffer)
      userUpdater.addToPictures(decodedToken.id, request.file.secure_url)
    }
    const splittedUri = request.file ? request.file.secure_url.split('upload') : ''
    const imageUri = request.file ? 
      splittedUri[0].concat('upload/w_1280').concat(splittedUri[1]) : ''

    const post = new Post({
      content: request.body.content,
      picture: request.file ? imageUri : '',
      pictureThumb: request.file ? imageUri : '', // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likes: [],
      comments: [],
      date: new Date()
    })
    const savedPost = await post.save()

    activityHelper.setActivity(decodedToken.id, 'post', savedPost._id)
    userUpdater.addToPosts(decodedToken.id, savedPost._id)
    request.io.emit('user_add_post', savedPost)

    return response.status(201).json(savedPost)
  } catch(error) {
    console.log(error.message)
    return response.status(400).send({ error: error.message })
  }
  
})

postRouter.post('/:id/comment', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      return response.status(401).end()
    }
    if(!post) {
      return response.status(400).end()
    }

    const newComments = post.comments.concat({ content: request.body.comment, user: decodedToken.username })

    const postToUpdate = {
      ...post.toObject(),
      comments: newComments
    }
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, postToUpdate, { new: true }).populate('user')
    
    request.io.emit('post_comment', updatedPost)
    activityHelper.setActivity(decodedToken.id, 'comment', post._id)
    return response.status(200).json(updatedPost)
  } catch(error) {
    return response.status(400).send({ error: error.message })
  }
})

postRouter.post('/:id/like', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      return response.status(401).end()
    }
    if(!post) {
      return response.status(400).end()
    }

    let newLikes = post.likes.filter(like => like !== decodedToken.id)
    if (newLikes.length === 0) {
      newLikes = post.likes.concat(decodedToken.id)
    }

    const postToUpdate = {
      ...post.toObject(),
      comments: post.comments
    }

    request.io.emit('post_like', updatedPost)
    activityHelper.setActivity(decodedToken.id, 'like', post._id)
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, postToUpdate, { new: true }).populate('user')
    return response.status(200).json(updatedPost)
  } catch(e) {
    return response.status(400).send({ error: e.message })
  }
})

module.exports = postRouter 