const workoutRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../util/config')
const Workout = require('../models/Workout')
const User = require('../models/User')
const { imgparser, cloudinary } = require('../util/imageupload')

workoutRouter.get('/all', async (request, response) => {
  try {
    const workouts = await Workout.find({}).populate('user')
    response.json(workouts)
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
      __v: workout.__v,
      _id: workout._id,
      type: workout.type,
      picture: workout.picture,
      pictureThumb: workout.pictureThumb, 
      user: workout.user, 
      likes: workout.likes, 
      comments: workout.comments, 
      date: workout.date, 
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
    
    request.file ? await cloudinary.uploader.upload(request.file.path) : ''

    const workout = new Workout({
      content: request.body.content,
      picture: request.file ? request.file.secure_url : '',
      pictureThumb: request.file ? request.file.secure_url : '', // TBD change this to real thumbnail
      type: request.body.type,
      user: decodedToken.id,
      likes: 0,
      comments: [],
      date: new Date()
    })
    await workout.save()
    response.status(201).end()
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
})

workoutRouter.post('/:id/comment', async (request, response) => {
  try {
    const workout = await Workout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      response.status(401).end()
    }
    if(!workout) {
      response.status(400).end()
    }

    workout.comments = workout.comments.concat({ content: request.body.comment, user: decodedToken.id })
    await workout.save()

    response.json(workout)
  } catch(e) {
    response.status(400).send({ error: e.message })
  }
})

module.exports = workoutRouter