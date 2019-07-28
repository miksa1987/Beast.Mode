const workoutRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../util/config')
const Workout = require('../models/Workout')
const userUpdater = require('../util/userUpdater')
const activityHelper = require('../util/activity')
const { imgparser, cloudinary } = require('../util/imageupload')

workoutRouter.get('/all', async (request, response) => {
  try {
    const workouts = await Workout.find({}).populate('user')
    return response.json(workouts)
  } catch(error) {
    return response.status(404).end()
  }
})

workoutRouter.get('/random', async (request, response) => {
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
    console.log(workouts)
    return response.json(workouts)
  } catch(error) {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
})

workoutRouter.get('/newest', async (request, response) => {
  try {
    const workouts = await Workout.find().sort({ _id: -1 }).limit(15).populate('user')
    console.log(workouts)
    return response.json(workouts)
  } catch(error) {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
})

workoutRouter.get('/mostliked', async (request, response) => {
  try {
    const workouts = await Workout.find().sort({ likesLength: -1 }).limit(15).populate('user')
    console.log(workouts)
    return response.json(workouts)
  } catch(error) {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
})

workoutRouter.get('/:id', async (request, response) => {
  try {
    const workout = await Workout.findById(request.params.id).populate('user')
    return response.json(workout)
  } catch(error) {
    return response.status(404).send('Workout not found!')
  }
})

workoutRouter.put('/:id', async (request, response) => {
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
    return response.status(400).json({ error: error.message })
  }
})

workoutRouter.post('/new', imgparser.single('image'), async (request, response, next) => {
  if(!request.token) {
    return response.status(401).end()
  }
  if(!request.body.content) {
    return response.status(400).send('Description or exercises missing')
  }
  
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    console.log(request.file)
    if (request.file) {
      await cloudinary.uploader.upload_stream(request.file.buffer, { resource_type: 'raw' }).end(request.file.buffer)
      userUpdater.addToPictures(decodedToken.id, request.file.secure_url)
    }
    const splittedUri = request.file ? request.file.secure_url.split('upload') : ''
    const imageUri = request.file ? 
      splittedUri[0].concat('upload/w_1280').concat(splittedUri[1]) : ''

    const workout = new Workout({
      content: request.body.content,
      picture: request.file ? imageUri : '',
      pictureThumb: request.file ? imageUri : '', // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likes: [],
      comments: [],
      date: new Date()
    })
    const savedWorkout = await workout.save()
    const workoutToReturn = await savedWorkout.populate('user').execPopulate()

    request.io.emit('user_add_workout', workoutToReturn)
    activityHelper.setActivity(decodedToken.id, 'workout', workoutToReturn._id)
    userUpdater.addToWorkouts(decodedToken.id, workoutToReturn._id)
    
    return response.status(201).json(workoutToReturn)
  } catch(error) {
    return response.status(400).send({ error: error.message })
  }
})


workoutRouter.post('/:id/comment', async (request, response) => {
  try {
    const workout = await Workout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if(!decodedToken) {
      return response.status(401).end()
    }
    if(!workout) {
      return response.status(400).end()
    }
    
    const newComments = workout.comments.concat({ content: request.body.comment, user: decodedToken.username })
    const workoutToUpdate = {
      ...workout.toObject(),
      comments: newComments
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(request.params.id, workoutToUpdate, { new: true })
    
    request.io.emit('workout_comment', updatedWorkout)
    activityHelper.setActivity(decodedToken.id, 'comment', workout._id)
    return response.status(200).json(updatedWorkout)
  } catch(error) {
    return response.status(400).send({ error: error.message })
  }
})

workoutRouter.post('/:id/like', async (request, response) => {
  console.log(request.params.id)
  console.log(request.token)
  try {
    const workout = await Workout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if(!decodedToken) {
      return response.status(401).end()
    }
    if(!workout) {
      return response.status(400).end()
    }
    let newLikes = workout.likes.filter(like => like !== decodedToken.id)
    if (newLikes.length === 0) {
      newLikes = workout.likes.concat(decodedToken.id)
    }
    
    const workoutToUpdate = {
      ...workout.toObject(),
      likes: newLikes,
      likesLength: newLikes.length
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(request.params.id, workoutToUpdate, { new: true }).populate('user')
    
    request.io.emit('workout_like', updatedWorkout)
    activityHelper.setActivity(decodedToken.id, 'like', workout._id)
    return response.status(200).json(updatedWorkout)
  } catch(error) {
    return response.status(400).send({ error: error.message })
  }
})
module.exports = workoutRouter