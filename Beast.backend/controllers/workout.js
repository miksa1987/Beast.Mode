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
    console.log(workouts)
    response.status(200).json(workouts)
  } catch(error) {
    response.status(404).end()
  }
})

workoutRouter.get('/:id', async (request, response) => {
  try {
    const workout = await Workout.findById(request.params.id).populate('user')
    response.json(workout)
  } catch(error) {
    response.status(404).send('Workout not found!')
  }
})

workoutRouter.put('/:id', async (request, response) => {
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
    const workout = await Workout.findById(request.params.id)
    
    const moddedWorkout = { 
      ...workout.toObject(),
      content: request.body.content 
    }

    const result = await Workout.findByIdAndUpdate(request.params.id, moddedWorkout, { new: true })
    
    response.status(200).json(result)
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
})

workoutRouter.post('/new', imgparser.single('image'), async (request, response, next) => {
  if(!request.token) {
    response.status(401).end()
  }
  if(!request.body.content) {
    response.status(400).send('Description or exercises missing')
  }
  
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    
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

    activityHelper.setActivity(decodedToken.id, 'workout', workout._id)
    userUpdater.addToWorkouts(decodedToken.id, workout._id)
    
    response.status(201).json(savedWorkout)
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
})


workoutRouter.post('/:id/comment', async (request, response) => {
  console.log(request.params.id)
  try {
    const workout = await Workout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if(!decodedToken) {
      response.status(401).end()
    }
    if(!workout) {
      response.status(400).end()
    }
    
    const newComments = workout.comments.concat({ content: request.body.comment, user: decodedToken.username })
    const workoutToUpdate = {
      ...workout.toObject(),
      comments: newComments
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(request.params.id, workoutToUpdate, { new: true })
    
    activityHelper.setActivity(decodedToken.id, 'comment', workout._id)
    response.status(200).json(updatedWorkout)
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
})

workoutRouter.post('/:id/like', async (request, response) => {
  console.log(request.params.id)
  console.log(request.token)
  try {
    const workout = await Workout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if(!decodedToken) {
      response.status(401).end()
    }
    if(!workout) {
      response.status(400).end()
    }
    let newLikes = workout.likes.filter(like => like !== decodedToken.id)
    if (newLikes.length === 0) {
      newLikes = workout.likes.concat(decodedToken.id)
    }
    
    const workoutToUpdate = {
      ...workout.toObject(),
      likes: newLikes
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(request.params.id, workoutToUpdate, { new: true }).populate('user')
    
    activityHelper.setActivity(decodedToken.id, 'like', workout._id)
    response.status(200).json(updatedWorkout)
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
})
module.exports = workoutRouter