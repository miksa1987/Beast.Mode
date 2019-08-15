const doneWorkoutRouter   = require('express').Router()
const jwt                 = require('jsonwebtoken')
const moment              = require('moment')
const DoneWorkout         = require('../models/DoneWorkout')
const User                = require('../models/User')
const config              = require('../util/config')
const activityHelper      = require('../util/activity')
const userUpdater         = require('../util/userUpdater')
const dates               = require('../util/dates')
const oldest              = require('../util/oldest')

doneWorkoutRouter.get('/all', async (request, response, next) => {
  try {
    const doneWorkouts = await DoneWorkout.find({})
    return response.status(200).json(doneWorkouts)
  } catch (error) {
    next(error)
  }
})

doneWorkoutRouter.get('/oldest', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if(!decodedToken.id) {
      return response.status(401).end()
    }

    const date = moment(oldest.getOldestDoneWorkout()).format('YYYY-M-D-H-m')
    
    return response.json({ oldest: date })
  } catch (error) {
    next(error)
  }
})

doneWorkoutRouter.get('/:id', async (request, response, next) => {
  try {
    const doneWorkout = await DoneWorkout.findById(request.params.id).populate('user')
    return response.status(200).json(doneWorkout)
  } catch (error) {
    next(error)
  }
})

doneWorkoutRouter.get('/byfriends/:date', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  const user = await User.findById(decodedToken.id)
  dates.setFetchInterval(user.fetchInterval || -128)

  try {
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
  } catch (error) {
    next(error)
  }
})

doneWorkoutRouter.post('/new', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }
  if(!request.body.content) {
    return response.status(400).send('Description or exercises missing')
  }
  
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    const doneWorkout = new DoneWorkout({
      content: request.body.content,
      picture: request.body.picture,
      pictureThumb: request.body.picture, // TBD change this to real thumbnail
      type: 'doneworkout',
      user: decodedToken.id,
      likes: [],
      comments: [],
      date: new Date(),
      time: request.body.time ? request.body.time : 0
    })
    const savedDoneWorkout = await doneWorkout.save()
    const doneWorkoutToReturn = await savedDoneWorkout.populate('user').execPopulate()

    if (request.body.picture !== '') userUpdater.addToPictures(decodedToken.id, request.body.picture)

    request.io.emit('user_add_doneworkout', doneWorkoutToReturn)
    activityHelper.setActivity(decodedToken.id, 'doneworkout', doneWorkoutToReturn._id)
    userUpdater.addToDoneWorkouts(decodedToken.id, doneWorkoutToReturn._id)
    
    return response.status(201).json(doneWorkoutToReturn)
  } catch(error) {
    next(error)
  }
})

doneWorkoutRouter.post('/:id/comment', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).end()
    }

    const updatedDoneWorkout = await DoneWorkout.findOneAndUpdate(
      { "_id": request.params.id },
      { $push: { "comments": {
        "content": request.body.comment,
        "user": decodedToken.username,
        "userid": decodedToken.id,
        "date": new Date()
      }}},
      { new: true }).populate('user')

    if (updatedDoneWorkout === null) {
      return response.status(204).end()
    }

    request.io.emit('comment_doneworkout', { 
      username: decodedToken.username, 
      userid: decodedToken.id,
      comment: request.body.comment, 
      doneworkoutid: updatedDoneWorkout._id 
    })
    activityHelper.setActivity(decodedToken.id, 'commentdoneworkout', updatedDoneWorkout._id)
    return response.status(200).json(updatedDoneWorkout)
  } catch (error) {
    next(error)
  }
})

doneWorkoutRouter.post('/:id/like', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      return response.status(401).end()
    }

    const updatedDoneWorkout = await DoneWorkout.findOneAndUpdate(
      { "_id": request.params.id, "likes": { $ne: decodedToken.id } },
      { $push: { "likes": decodedToken.id }, $inc: { "likesLength": 1 }},
      { new: true }).populate('user')

    if (updatedDoneWorkout === null) {
      return response.status(204).end()
    }

    activityHelper.setActivity(decodedToken.id, 'likedoneworkout', updatedDoneWorkout._id)
    request.io.emit('like_doneworkout', { 
      username: decodedToken.username, 
      userid: decodedToken.id,
      doneworkoutid: updatedDoneWorkout._id 
    })

    return response.status(200).json(updatedDoneWorkout)
  } catch(error) {
    next(error)
  }
})

doneWorkoutRouter.put('/:id', async (request, response, next) => {
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
    const doneWorkout = await DoneWorkout.findById(request.params.id)
    
    const doneWorkoutToUpdate = { 
      ...doneWorkout.toObject(),
      content: request.body.content 
    }

    const savedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true })
    
    return response.status(200).json(savedDoneWorkout)
  } catch(error) {
    next(error)
  }
})


module.exports = doneWorkoutRouter