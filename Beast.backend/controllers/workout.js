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
  if(!(request.body.description || request.body.exercises)) {
    response.status(400).send('Modified description or exercises missing')
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    const workout = Workout.findById(request.params.id)
    const user = User.findById(decodedToken.id)

    // Not populated now!
    if(user.id !== workout.user) {
      response.status(400).end()
    }

    const moddedWorkout = { ...workout, description: request.body.description, exercises: request.body.exercises }
    const result = await Workout.findByIdAndUpdate(workout.id, moddedWorkout, { new: true })

    response.json(result)
  } catch(e) {
    response.status(400).send({ error: e.message })
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
    
    request.file.path ? await cloudinary.uploader.upload(request.file.path) : ''

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