const searchRouter  = require('express').Router()
const jwt           = require('jsonwebtoken')
const config        = require('../util/config')
const User          = require('../models/User')
const Post          = require('../models/Post')
const Workout       = require('../models/Workout')
const DoneWorkout   = require('../models/DoneWorkout')
const dates         = require('../util/dates')

// Very simple search feature for now

searchRouter.post('/', async (request, response) => {
  if (!request.body.type) return response.status(400).json({ error: 'Search type missing'})
  if (!request.body.search) return response.status(400).json({ error: 'Search string missing'})
  if (!request.token) return response.status(401).json({ error: 'Not authorized'})

  try {
    // Might remove this
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'Not authorized' })

    let results = []
    switch (request.body.type) {
      case 'user':
        results = await User.find({ username: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        break
      case 'post':
        results = await Post.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
      case 'workout':
        results = await Workout.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        break  
      case 'doneworkout':
        results = await DoneWorkout.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        break
      default:
        results = await User.find({ username: {
          '$regex': request.body.search,
          '$options': 'i'
        }})
        results = results.concat(await Post.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}))
        results = results.concat(await Workout.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}))
        results = results.concat(await DoneWorkout.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}))
    }

    return response.status(200).json(results)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

searchRouter.post('/bydate/:date', async (request, response) => {
  if (!request.body.type) return response.status(400).json({ error: 'Search type missing'})
  if (!request.body.search) return response.status(400).json({ error: 'Search string missing'})
  if (!request.token) return response.status(401).json({ error: 'Not authorized'})

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)
    // Might remove this
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'Not authorized' })

    let results = []
    switch (request.body.type) {
      case 'user':
        results = await User.find({ $and: [ { username: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ]})
        break
      case 'post':
        results = await Post.find({ $and: [ { content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ]})
      case 'workout':
        results = await Workout.find({ $and: [ { content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] })
        break  
      case 'doneworkout':
        results = await DoneWorkout.find({ $and: [ { content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] })
        break
      default:
        results = await User.find({ $and: [ { username: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] })
        results = results.concat(await Post.find({ content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}))
        results = results.concat(await Workout.find({ $and: [ { content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] }))
        results = results.concat(await DoneWorkout.find({ $and: [ { content: {
          '$regex': request.body.search,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] }))
    }

    return response.status(200).json(results)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = searchRouter