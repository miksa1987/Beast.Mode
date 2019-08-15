const workoutRouter     = require('express').Router()
const jwt               = require('jsonwebtoken')
const config            = require('../util/config')
const Workout           = require('../models/Workout')
const User              = require('../models/User')
const userUpdater       = require('../util/userUpdater')
const activityHelper    = require('../util/activity')
const dates             = require('../util/dates')
const oldest            = require('../util/oldest')

workoutRouter.get('/all', async (request, response, next) => {
  try {
    const workouts = await Workout.find({}).populate('user')
    return response.json(workouts)
  } catch(error) {
    next(error)
  }
})

workoutRouter.get('/random', async (request, response, next) => {
  try {
    const workouts = await Workout.aggregate([
      { $sample: { size: 15 }},
      { $lookup: {
        "from": "users",
        "localField": "user",
        "foreignField": "_id",
        "as": "user"
      }},
      { "$unwind": "$user" }])
    return response.json(workouts)
  } catch(error) {
    next(error)
  }
})

workoutRouter.get('/newest', async (request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ _id: -1 }).limit(15).populate('user')
    return response.json(workouts)
  } catch(error) {
    next(error)
  }
})

workoutRouter.get('/mostliked', async (request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ likesLength: -1 }).limit(15).populate('user')
    return response.json(workouts)
  } catch(error) {
    next(error)
  }
})

workoutRouter.get('/oldest', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if(!decodedToken.id) {
      return response.status(401).end()
    }

    const date = moment(oldest.getOldestWorkout()).format('YYYY-M-D-H-m')

    return response.json({ oldest: date })
  } catch (error) {
    next(error)
  }
})

workoutRouter.get('/byfriends', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  const user = await User.findById(decodedToken.id)

  try {
    const workouts = await Workout.find({ user: { $in: user.friends }})
      .sort({ _id: 1 }).populate('user')

    return response.json(workouts)
  } catch (error) {
    next(error)
  }
})

workoutRouter.get('/byfriends/:date', async (request, response, next) => {
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

    if (oldest.getOldestWorkout() !== '') {
      const all = await Workout.find({
        $and: [
            { $and: [ { date: { $gte: oldest.getOldestWorkout() }}, { date: { $lte: enddate }},
            { user: { $in: user.friends }}
          ]}
        ]
      })

      if (all.length === 0) {
        return response.json({
          workouts: [],
          startdate: dates.getDateString(oldest.getOldestWorkout()),
          enddate: dates.getDateString(enddate),
          end: true
        })
      }
    }
    
    const workouts = await Workout.find({
      $and: [
          { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
          { user: { $in: user.friends }}
        ]}
      ]
    }).sort({ _id: 1 }).populate('user')

    const responsedata = {
      workouts,
      startdate,
      enddate,
      end: false
    }

    return response.json(responsedata)
  } catch (error) {
    next(error)
  }
})

workoutRouter.get('/:id', async (request, response, next) => {
  try {
    const workout = await Workout.findById(request.params.id).populate('user')
    return response.json(workout)
  } catch(error) {
    next(error)
  }
})

workoutRouter.put('/:id', async (request, response, next) => {
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
    const workout = await Workout.findById(request.params.id)
    
    const moddedWorkout = { 
      ...workout.toObject(),
      content: request.body.content 
    }

    const result = await Workout.findByIdAndUpdate(request.params.id, moddedWorkout, { new: true })
    
    return response.status(200).json(result)
  } catch(error) {
    next(error)
  }
})

workoutRouter.post('/new', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }
  if(!request.body.content) {
    return response.status(400).send('Description or exercises missing')
  }
  
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    const workout = new Workout({
      content: request.body.content,
      picture: request.body.picture,
      pictureThumb: request.body.picture, // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likes: [],
      comments: [],
      date: new Date()
    })
    const savedWorkout = await workout.save()
    const workoutToReturn = await savedWorkout.populate('user').execPopulate()

    if (request.body.picture !== '') userUpdater.addToPictures(decodedToken.id, request.body.picture)

    request.io.emit('user_add_workout', workoutToReturn)
    activityHelper.setActivity(decodedToken.id, 'workout', workoutToReturn._id)
    userUpdater.addToWorkouts(decodedToken.id, workoutToReturn._id)
    
    return response.status(201).json(workoutToReturn)
  } catch(error) {
    next(error)
  }
})


workoutRouter.post('/:id/comment', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if(!decodedToken) {
      return response.status(401).end()
    }
    
    const updatedWorkout = await Workout.findOneAndUpdate(
      { "_id": request.params.id },
      { $push: { "comments": {
        "content": request.body.comment,
        "user": decodedToken.username,
        "userid": decodedToken.id,
        "date": new Date()
      }}},
      { new: true })
      
    if (updatedWorkout === null) {
      return response.status(204).end()
    }

    activityHelper.setActivity(decodedToken.id, 'comment', updatedWorkout._id)
    return response.status(200).json(updatedWorkout)
  } catch(error) {
    next(error)
  }
})

workoutRouter.post('/:id/like', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if(!decodedToken) {
      return response.status(401).end()
    }
    const updatedWorkout = await Workout.findOneAndUpdate(
      { "_id": request.params.id, "likes": { $ne: decodedToken.id } },
      { $push: { "likes": decodedToken.id }, $inc: { "likesLength": 1 }},
      { new: true })

    if (updatedWorkout === null) {
      return response.status(204).end()
    }

    activityHelper.setActivity(decodedToken.id, 'like', updatedWorkout._id)
    request.io.emit('like_workout', { 
      username: decodedToken.username, 
      userid: decodedToken.id,
      workoutid: updatedWorkout._id 
    })

    return response.status(200).json(updatedWorkout)
  } catch(error) {
    next(error)
  }
})

module.exports = workoutRouter