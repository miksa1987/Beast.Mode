const postRouter      = require('express').Router()
const config          = require('../util/config')
const Post            = require('../models/Post')
const User            = require('../models/User')
const userUpdater     = require('../util/userUpdater')
const dates           = require('../util/dates')
const oldest          = require('../util/oldest')
const jwt             = require('jsonwebtoken')
const moment          = require('moment')
const activityHelper  = require('../util/activity')

postRouter.get('/all', async (request, response, next) => {
  try {
    const posts = await Post.find({}).populate('user')
    return response.status(200).json(posts)
  } catch(error) {
    next(error)
  }
})

postRouter.get('/oldest', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if(!decodedToken.id) {
      return response.status(401).end()
    }

    const date = moment(oldest.getOldestPost()).format('YYYY-M-D-H-m')
    return response.json({ oldest: date })
  } catch (error) {
    next(error)
  }
})

postRouter.get('/:id', async (request, response, next) => {
  try {
    const post = await Post.findById(request.params.id).populate('user')
    return response.status(200).json(post)
  } catch(error) {
    next(error)
  }
})

// Date format: YYYY-MM-DD-hh-mm 
// CAUTION: No zero in front of single-digit values!
postRouter.get('/byfriends/:date', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  const user = await User.findById(decodedToken.id)
  dates.setFetchInterval(user.fetchInterval || -128)
  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)
    
    if (oldest.getOldestPost() !== '') {
      const all = await Post.find({
        $and: [
            { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
            { user: { $in: user.friends }}
          ]}
        ]
      })
      
      if (all.length === 0) {
        return response.json({
          posts: [],
          startdate: dates.getDateString(oldest.getOldestPost()),
          enddate: dates.getDateString(enddate),
          end: true
        })
      }
    }
    const posts = await Post.find({
      $and: [
          { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
          { user: { $in: user.friends }}
      ]}]}).populate('user')


    const responsedata = {
      posts,
      startdate: dates.getDateString(startdate),
      enddate: dates.getDateString(enddate),
      end: false
    }

    return response.json(responsedata)
  } catch (error) {
    next(error)
  }
})

postRouter.put('/:id', async (request, response, next) => {
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
    next(error)
  }
})

postRouter.post('/new', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }
  if(!(request.body.content)) {
    return response.status(400).send('Content missing')
  }
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    const post = new Post({
      content: request.body.content,
      picture: request.body.picture,
      pictureThumb: request.body.picture, // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likesLength: 0,
      likes: [],
      comments: [],
      date: new Date()
    })
    const savedPost = await post.save()
    const populatedPost = await savedPost.populate('user').execPopulate()

    if (request.body.picture !== '') userUpdater.addToPictures(decodedToken.id, request.body.picture)

    activityHelper.setActivity(decodedToken.id, 'post', populatedPost._id)
    userUpdater.addToPosts(decodedToken.id, populatedPost._id)
    request.io.emit('user_add_post', populatedPost)

    return response.status(201).json(populatedPost)
  } catch(error) {
    next(error)
  }
  
})

postRouter.post('/:id/comment', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      return response.status(401).end()
    }

    const updatedPost = await Post.findOneAndUpdate(
      { "_id": request.params.id },
      { $push: { "comments": {
        "content": request.body.comment,
        "user": decodedToken.username,
        "userid": decodedToken.id,
        "date": new Date()
      }}},
      { new: true }).populate('user')
    
    if (updatedPost === null) {
      return response.status(204).end()
    }
    request.io.emit('comment_post', { 
      username: decodedToken.username, 
      userid: decodedToken.id,
      comment: request.body.comment, 
      postid: updatedPost._id 
    })

    activityHelper.setActivity(decodedToken.id, 'comment', updatedPost._id)
    return response.status(200).json(updatedPost)
  } catch(error) {
    next(error)
  }
})

postRouter.post('/:id/like', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      return response.status(401).end()
    }

    const updatedPost = await Post.findOneAndUpdate(
      { "_id": request.params.id, "likes": { $ne: decodedToken.id } },
      { $push: { "likes": decodedToken.id }, $inc: { "likesLength": 1 }},
      { new: true }).populate('user')
    
      if (updatedPost === null) {
        return response.status(204).end()
      }

    activityHelper.setActivity(decodedToken.id, 'like', updatedPost._id)
    request.io.emit('like_post', { 
      username: decodedToken.username, 
      userid: decodedToken.id,
      postid: updatedPost._id 
    })

    return response.status(200).json(updatedPost)
  } catch (error) {
    next(error)
  }
})

module.exports = postRouter 