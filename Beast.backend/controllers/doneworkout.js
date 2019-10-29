const doneWorkoutRouter                   = require('express').Router()
const moment                              = require('moment')
const DoneWorkout                         = require('../models/DoneWorkout')
const activityHelper                      = require('../util/activity')
const userUpdater                         = require('../util/userUpdater')
const dates                               = require('../util/dates')
const oldest                              = require('../util/oldest')
const { asyncHandler, checkTokenGetUser}  = require('./common')

doneWorkoutRouter.get('/all', asyncHandler(async (request, response, next) => {
  const doneWorkouts = await DoneWorkout.find({})
  return response.json(doneWorkouts)
}))

doneWorkoutRouter.get('/oldest', asyncHandler(async (request, response, next) => {
  const date = moment(oldest.getOldestDoneWorkout()).format('YYYY-M-D-H-m')
    
  return response.json({ oldest: date })
}))

doneWorkoutRouter.get('/:id', asyncHandler(async (request, response, next) => {
  const doneWorkout = await DoneWorkout.findById(request.params.id).populate('user')
  return response.json(doneWorkout)
}))

doneWorkoutRouter.get('/byfriends/:date', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  dates.setFetchInterval(user.fetchInterval || -128)

  let [startdate, enddate] = dates.getFetchDates(request.params.date)

  if (oldest.getOldestDoneWorkout() !== '') {
    const all = await DoneWorkout.find({
      $and: [
        { $and: [ { date: { $gte: oldest.getOldestDoneWorkout() }}, { date: { $lte: enddate }},
          { user: { $in: user.friends }}
        ]}
      ]
    })
    
    if (all.length === 0) {
      return response.json({
        doneworkouts: [],
        startdate: dates.getDateString(oldest.getOldestDoneWorkout()),
        enddate: dates.getDateString(enddate),
        end: true
      })
    }
  }

  const doneworkouts = await DoneWorkout.find({
    $and: [
      { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
        { user: { $in: user.friends }}
      ]}]}).populate('user')

  const responsedata = {
    doneworkouts,
    startdate: dates.getDateString(startdate),
    enddate: dates.getDateString(enddate),
    end: false
  }

  return response.json(responsedata)
}))

doneWorkoutRouter.post('/new', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)

  const doneWorkout = new DoneWorkout({
    content: request.body.content,
    picture: request.body.picture,
    pictureThumb: request.body.picture, // TBD change this to real thumbnail
    type: 'doneworkout',
    user: user.id,
    likes: [],
    comments: [],
    date: new Date(),
    time: request.body.time ? request.body.time : 0
  })
  const savedDoneWorkout = await doneWorkout.save()
  const doneWorkoutToReturn = await savedDoneWorkout.populate('user').execPopulate()

  if (request.body.picture !== '') userUpdater.addToPictures(user.id, request.body.picture)

  request.io.emit('user_add_doneworkout', doneWorkoutToReturn)
  activityHelper.setActivity(user.id, 'doneworkout', doneWorkoutToReturn._id)
  userUpdater.addToDoneWorkouts(user.id, doneWorkoutToReturn._id)
    
  return response.status(201).json(doneWorkoutToReturn)
}))

doneWorkoutRouter.post('/:id/comment', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)

  const updatedDoneWorkout = await DoneWorkout.findOneAndUpdate(
    { "_id": request.params.id },
    { $push: { "comments": {
      "content": request.body.comment,
      "user": user.username,
      "userid": user.id,
      "date": new Date()
    }}},
    { new: true }).populate('user')

  if (updatedDoneWorkout === null) {
    return response.status(204).end()
  }

  request.io.emit('comment_doneworkout', { 
    username: user.username, 
    userid: user.id,
    comment: request.body.comment, 
    doneworkoutid: updatedDoneWorkout._id 
  })
  activityHelper.setActivity(user.id, 'commentdoneworkout', updatedDoneWorkout._id)
  return response.status(200).json(updatedDoneWorkout)
}))

doneWorkoutRouter.post('/:id/like', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)

  const updatedDoneWorkout = await DoneWorkout.findOneAndUpdate(
    { "_id": request.params.id, "likes": { $ne: user.id } },
    { $push: { "likes": user.id }, $inc: { "likesLength": 1 }},
    { new: true }).populate('user')

  if (updatedDoneWorkout === null) {
    return response.status(204).end()
  }

  activityHelper.setActivity(user.id, 'likedoneworkout', updatedDoneWorkout._id)
  request.io.emit('like_doneworkout', { 
    username: user.username, 
    userid: user.id,
    doneworkoutid: updatedDoneWorkout._id 
  })

  return response.status(200).json(updatedDoneWorkout)
}))

doneWorkoutRouter.put('/:id', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)

  const doneWorkout = await DoneWorkout.findById(request.params.id)
    
  const doneWorkoutToUpdate = { 
    ...doneWorkout.toObject(),
    content: request.body.content 
  }

  const savedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true })
    
  return response.status(200).json(savedDoneWorkout)
}))


module.exports = doneWorkoutRouter