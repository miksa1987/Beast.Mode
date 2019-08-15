const searchRouter  = require('express').Router()
const jwt           = require('jsonwebtoken')
const config        = require('../util/config')
const User          = require('../models/User')
const Post          = require('../models/Post')
const Workout       = require('../models/Workout')
const DoneWorkout   = require('../models/DoneWorkout')
const dates         = require('../util/dates')
const oldest        = require('../util/oldest')

// Very simple search feature for now

searchRouter.post('/', async (request, response, next) => {
  if (!request.body.type) return response.status(400).json({ error: 'Search type missing'})
  if (!request.body.keyword) return response.status(400).json({ error: 'Keyword string missing'})
  if (!request.token) return response.status(401).json({ error: 'Not authorized'})

  try {
    // Might remove this
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'Not authorized' })

    let results = []
    switch (request.body.type) {
      case 'user':
        results = await User.find({ username: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
        break
      case 'post':
        results = await Post.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
      case 'workout':
        results = await Workout.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
        break  
      case 'doneworkout':
        results = await DoneWorkout.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
        break
      default:
        results = await User.find({ username: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
        results = results.concat(await Post.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}))
        results = results.concat(await Workout.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}))
        results = results.concat(await DoneWorkout.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}))
    }

    return response.status(200).json(results)
  } catch (error) {
    next(error)
  }
})

searchRouter.post('/:date', async (request, response, next) => {
  if (!request.body.type) return response.status(400).json({ error: 'Search type missing'})
  if (!request.body.keyword) return response.status(400).json({ error: 'Keyword string missing'})
  if (!request.token) return response.status(401).json({ error: 'Not authorized'})

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    // Might remove this verification
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'Not authorized' })

    let results = []
    switch (request.body.type) {
      case 'user':
        results = await User.find({ username: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
        break

      case 'post':
        if (oldest.getOldestPost() !== '') {
          const all = await Post.find({
            $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }} ]
          })  
          if (all.length === 0) {
            return response.json({
              results: [],
              startdate: dates.getDateString(oldest.getOldestPost()),
              enddate: dates.getDateString(enddate),
              end: true
            })
          }
        }
        results = await Post.find({ $and: [ { content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ]})

      case 'workout':
        if (oldest.getOldestWorkout() !== '') {
          const all = await Workout.find({
            $and: [ { date: { $gte: oldest.getOldestWorkout() }}, { date: { $lte: enddate }} ]
          })  
          if (all.length === 0) {
            return response.json({
              results: [],
              startdate: dates.getDateString(oldest.getOldestWorkout()),
              enddate: dates.getDateString(enddate),
              end: true
            })
          }
        }
        results = await Workout.find({ $and: [ { content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] })
        break
        
      case 'doneworkout':
        if (oldest.getOldestDoneWorkout() !== '') {
          const all = await DoneWorkout.find({
            $and: [ { date: { $gte: oldest.getOldestDoneWorkout() }}, { date: { $lte: enddate }} ]
          })  
          if (all.length === 0) {
            return response.json({
              results: [],
              startdate: dates.getDateString(oldest.getOldestDoneWorkout()),
              enddate: dates.getDateString(enddate),
              end: true
            })
          }
        }
        results = await DoneWorkout.find({ $and: [ { content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] })
        break
      default:
        if (oldest.getOldestPost() !== '' || oldest.getOldestWorkout() !== '' || oldest.getOldestDoneWorkout() !== '') {
          let all = await Post.find({
            $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }} ]
          })
          all = all.concat(await Workout.find({
            $and: [ { date: { $gte: oldest.getOldestWorkout() }}, { date: { $lte: enddate }} ]
          }))
          all = all.concat(await DoneWorkout.find({
            $and: [ { date: { $gte: oldest.getOldestDoneWorkout() }}, { date: { $lte: enddate }} ]
          }))
          if (all.length === 0) {
            return response.json({
              results: [],
              startdate: dates.getDateString(oldest.getOldest()),
              enddate: dates.getDateString(enddate),
              end: true
            })
          }
        }

        results = await User.find({ username: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }})
        results = results.concat(await Post.find({ content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}))
        results = results.concat(await Workout.find({ $and: [ { content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] }))
        results = results.concat(await DoneWorkout.find({ $and: [ { content: {
          '$regex': request.body.keyword,
          '$options': 'i'
        }}, { date: { $gte: startdate }}, { date: { $lte: enddate }} ] }))
    }

    return response.status(200).json({
      results,
      startdate: dates.getDateString(startdate),
      enddate: dates.getDateString(enddate),
      end: false
    })
  } catch (error) {
    next(error)
  }
})

module.exports = searchRouter