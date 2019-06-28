const workoutRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../util/config')
const Workout = require('../models/Workout')

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

workoutRouter.post('/', async (request, response, next) => {
  const workout = new Workout(request.body)
  await workout.save()
  response.io.emit('newworkout', workout)
  response.status(204).end()
})

workoutRouter.post('/:id/comment', async (request, response) => {
  try {
    const workout = await Workout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.body.token, config.SECRET)

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