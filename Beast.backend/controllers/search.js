const searchRouter  = require('express').Router()
const jwt           = require('jsonwebtoken')
const config        = require('../util/config')
const User          = require('../models/User')
const Post          = require('../models/Post')
const Workout       = require('../models/Workout')
const DoneWorkout   = require('../models/DoneWorkout')

// Very simple search feature for now

searchRouter.post('/', async (request, response) => {
  if (!request.body.type) return response.status(400).json({ error: 'Search type missing'})
  if (!request.body.search) return response.status(400).json({ error: 'Search string missing'})
  if (!request.token) return response.status(401).json({ error: 'Not authorized'})

  try {
    // Might remove this
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'Not authorized' })

    let result = []
    switch (request.body.type) {
      case 'user':
        result = await User.find({ username: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        break
      case 'post':
        result = await Post.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
      case 'workout':
        result = await Workout.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        break  
      case 'doneworkout':
        result = await DoneWorkout.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        break
      default:

    }

    return response.status(200).json(result)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = searchRouter