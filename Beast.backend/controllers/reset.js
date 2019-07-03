const Post = require('../models/Post')
const Workout = require('../models/Workout')
const resetRouter = require('express').Router()

// DO NOT USE IF NOT COMPLETELY SURE !!!

resetRouter.get('/', async (request, response) => {
  await Post.deleteMany({})
  await Workout.deleteMany({})

  response.status(204).end()
})

module.exports = resetRouter