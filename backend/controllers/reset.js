const Post = require('../models/Post')
const Workout = require('../models/Workout')
const DoneWorkout = require('../models/DoneWorkout')
const User = require('../models/User')
const resetRouter = require('express').Router()

// DO NOT USE IF NOT COMPLETELY SURE !!!

resetRouter.get('/', async (request, response) => {
  await Post.deleteMany({})
  await Workout.deleteMany({})
  await DoneWorkout.deleteMany({})
  await User.deleteMany({})

  return response.status(204).send('WII')
})

module.exports = resetRouter