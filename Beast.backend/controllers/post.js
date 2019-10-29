const postRouter                          = require('express').Router()
const Post                                = require('../models/Post')
const userUpdater                         = require('../util/userUpdater')
const dates                               = require('../util/dates')
const oldest                              = require('../util/oldest')
const moment                              = require('moment')
const activityHelper                      = require('../util/activity')
const { asyncHandler, checkTokenGetUser}  = require('./common')

postRouter.get('/all', asyncHandler(async (request, response, next) => {
  const posts = await Post.find({}).populate('user')
  return response.json(posts)
}))

postRouter.get('/oldest', asyncHandler(async (request, response, next) => {
  const date = moment(oldest.getOldestPost()).format('YYYY-M-D-H-m')
  return response.json({ oldest: date })
}))

postRouter.get('/:id', asyncHandler(async (request, response, next) => {
  const post = await Post.findById(request.params.id).populate('user')
  return response.json(post)
}))

postRouter.get('/byfriends/skip/:skip', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  const postsCount = await Post.countDocuments({ user: { $in: user.friends } })

  if (postsCount > Number(request.params.skip)) {
    const posts = await Post.find({ user: { $in: user.friends } })
      .sort({ _id: -1 })
      .skip(Number(request.params.skip))
      .limit(30)
      .populate('user')
    
    return response.json({ posts, end: false })
  }

  return response.json({ posts: [], end: true })
}))

// Date format: YYYY-MM-DD-hh-mm 
// CAUTION: No zero in front of single-digit values!
postRouter.get('/byfriends/:date', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  dates.setFetchInterval(user.fetchInterval || -128)

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
}))

postRouter.put('/:id', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  const post = await Post.findById(request.params.id)
    
  const moddedPost = { 
    ...post.toObject(),
    content: request.body.content 
  }

  const result = await Post.findByIdAndUpdate(request.params.id, moddedPost, { new: true })
    
  return response.json(result)
}))

postRouter.post('/new', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  const post = new Post({
    content: request.body.content,
    picture: request.body.picture,
    pictureThumb: request.body.picture, // TBD change this to real thumbnail
    type: request.body.type,
    user: user.id,
    likesLength: 0,
    likes: [],
    comments: [],
    date: new Date()
  })
  const savedPost = await post.save()
  const populatedPost = await savedPost.populate('user').execPopulate()

  if (request.body.picture !== '') userUpdater.addToPictures(decodedToken.id, request.body.picture)

  activityHelper.setActivity(user.id, 'post', populatedPost._id)
  userUpdater.addToPosts(user.id, populatedPost._id)
  request.io.emit('user_add_post', populatedPost)

  return response.status(201).json(populatedPost)
}))

postRouter.post('/:id/comment', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)

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
  return response.json(updatedPost)
}))

postRouter.post('/:id/like', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
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

  return response.json(updatedPost)
}))

module.exports = postRouter 