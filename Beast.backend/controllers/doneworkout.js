const doneWorkoutRouter   = require('express').Router()
const jwt                 = require('jsonwebtoken')
const moment              = require('moment')
const DoneWorkout         = require('../models/DoneWorkout')
const User                = require('../models/User')
const config              = require('../util/config')
const activityHelper      = require('../util/activity')
const userUpdater         = require('../util/userUpdater')
const dates               = require('../util/dates')

doneWorkoutRouter.get('/all', async (request, response) => {
  try {
    const doneWorkouts = await DoneWorkout.find({})
    return response.status(200).json(doneWorkouts)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

doneWorkoutRouter.get('/oldest', async (request, response) => {
  if(!request.token) {
    return response.status(401).end()
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if(!decodedToken.id) {
      return response.status(401).end()
    }

    const doneWorkout = await DoneWorkout.findOne().sort({ _id: 1 }).limit(1)
    const date = moment(doneWorkout.date).format('YYYY-M-D-H-m')
    console.log(date)

    return response.json({ oldest: date })
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

doneWorkoutRouter.get('/:id', async (request, response) => {
  try {
    const doneWorkout = await DoneWorkout.findById(request.params.id)
    return response.status(200).json(doneWorkout)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

doneWorkoutRouter.get('/byfriends/:date', async (request, response) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  const user = await User.findById(decodedToken.id)

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    let doneworkouts = await DoneWorkout.find({
      $and: [
          { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
          { user: { $in: user.friends }}
        ]}
      ]
    }).sort({ _id: 1 }).populate('user')

    const responsedata = {
      doneworkouts,
      startdate: dates.getDateString(startdate),
      enddate: dates.getDateString(enddate),
      end: false
    }

    return response.json(responsedata)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

doneWorkoutRouter.post('/new', async (request, response, next) => {
  console.log(request.body)
  if(!request.token) {
    return response.status(401).end()
  }
  if(!request.body.content) {
    console.log('content missing')
    return response.status(400).send('Description or exercises missing')
  }
  
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    const doneWorkout = new DoneWorkout({
      content: request.body.content,
      picture: request.body.picture,
      pictureThumb: request.body.picture, // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likes: [],
      comments: [],
      date: new Date(),
      time: request.body.time ? request.body.time : 0
    })
    const savedDoneWorkout = await doneWorkout.save()
    const doneWorkoutToReturn = await savedDoneWorkout.populate('user').execPopulate()

    if (request.body.picture !== '') userUpdater.addToPictures(decodedToken.id, request.body.picture)

    request.io.emit('user_add_workout', doneWorkoutToReturn)
    activityHelper.setActivity(decodedToken.id, 'workout', doneWorkoutToReturn._id)
    userUpdater.addToWorkouts(decodedToken.id, doneWorkoutToReturn._id)
    
    return response.status(201).json(doneWorkoutToReturn)
  } catch(error) {
    console.log(error.message)
    return response.status(400).send({ error: error.message })
  }
})

doneWorkoutRouter.post('/:id/comment', async (request, response) => {
  if (!request.token) return response.status(401).end()
  
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) return response.status(401).end()

    const user = await user.findById(decodedToken.id)
    const doneWorkout = await DoneWorkout.findById(request.params.id)

    const newComments = doneWorkout.comments.concat(request.body.comment)
    const doneWorkoutToUpdate = { ...doneWorkout.toObject(), comments: newComments }

    const updatedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true })

    request.io.emit('doneworkout_comment', updatedPost)
    activityHelper.setActivity(decodedToken.id, 'comment', updatedDoneWorkout._id)
    return response.status(200).json(updatedDoneWorkout)

  } catch (error) {
    return response.status(400).json({ error: error.message})
  }
})

doneWorkoutRouter.post('/:id/like', async (request, response) => {
  try {
    const doneWorkout = await DoneWorkout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      return response.status(401).end()
    }
    if(!doneWorkout) {
      return response.status(400).end()
    }

    let newLikes = doneWorkout.likes.filter(like => like !== decodedToken.id)
    if (newLikes.length === 0) {
      newLikes = doneWorkout.likes.concat(decodedToken.id)
    }

    const doneWorkoutToUpdate = {
      ...doneWorkout.toObject(),
      comments: post.comments
    }
    
    const updatedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true }).populate('user')
    
    request.io.emit('doneworkout_like', updatedDoneWorkout)
    activityHelper.setActivity(decodedToken.id, 'like', updatedDoneWorkout._id)
    return response.status(200).json(updatedDoneWorkout)
  } catch(error) {
    return response.status(400).send({ error: error.message })
  }
})

doneWorkoutRouter.put('/:id', async (request, response) => {
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
    return response.status(400).json({ error: error.message })
  }
})


module.exports = doneWorkoutRouter