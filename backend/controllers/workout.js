const workoutRouter                       = require('express').Router()
const Workout                             = require('../models/Workout')
const userUpdater                         = require('../util/userUpdater')
const activityHelper                      = require('../util/activity')
const dates                               = require('../util/dates')
const oldest                              = require('../util/oldest')

const { asyncHandler, 
  checkTokenGetUser,
  create,
  like,
  comment }                         = require('./common')

workoutRouter.get('/all', asyncHandler(async (request, response, next) => {
  const workouts = await Workout.find({}).populate('user')
  return response.json(workouts)
}))

workoutRouter.get('/random', asyncHandler(async (request, response, next) => {
  const workouts = await Workout.aggregate([
    { $sample: { size: 15 }},
    { $lookup: {
      "from": "users",
      "localField": "user",
      "foreignField": "_id",
      "as": "user"
    }},
    { "$unwind": "$user" }])
  return response.json(workouts)
}))

workoutRouter.get('/newest', asyncHandler(async (request, response, next) => {
  const workouts = await Workout.find().sort({ _id: -1 }).limit(15).populate('user')
  return response.json(workouts)
}))

workoutRouter.get('/mostliked', asyncHandler(async (request, response, next) => {
  const workouts = await Workout.find().sort({ likesLength: -1 }).limit(15).populate('user')
  return response.json(workouts)
}))

workoutRouter.get('/oldest', asyncHandler(async (request, response, next) => {
  const date = moment(oldest.getOldestWorkout()).format('YYYY-M-D-H-m')
  return response.json({ oldest: date })
}))

workoutRouter.get('/byfriends', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)

    const workouts = await Workout.find({ user: { $in: user.friends }})
      .sort({ _id: 1 }).populate('user')
    return response.json(workouts)
}))

workoutRouter.get('/byfriends/skip/:skip', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  const workoutsCount = await Workout.countDocuments({ user: { $in: user.friends } })

  if (workoutsCount > Number(request.params.skip)) {
    const workouts = await Workout.find({ user: { $in: user.friends } })
      .sort({ _id: -1 })
      .skip(Number(request.params.skip))
      .limit(30)
      .populate('user')
    
    return response.json({ workouts, end: false })
  }

  return response.json({ workouts: [], end: true })
}))

workoutRouter.get('/byfriends/:date', asyncHandler(async (request, response, next) => {
  const user = checkTokenGetUser(request.token)
  let [startdate, enddate] = dates.getFetchDates(request.params.date)

  if (oldest.getOldestWorkout() !== '') {
    const all = await Workout.find({
      $and: [
        { $and: [ { date: { $gte: oldest.getOldestWorkout() }}, { date: { $lte: enddate }},
          { user: { $in: user.friends }}
        ]}
      ]
    })

    if (all.length === 0) {
      return response.json({
        workouts: [],
        startdate: dates.getDateString(oldest.getOldestWorkout()),
        enddate: dates.getDateString(enddate),
        end: true
      })
    }
  }
    
  const workouts = await Workout.find({
    $and: [
      { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
        { user: { $in: user.friends }}
      ]}
    ]
  }).sort({ _id: 1 }).populate('user')

  const responsedata = {
    workouts,
    startdate,
    enddate,
    end: false
  }

  return response.json(responsedata)
}))

workoutRouter.get('/:id', asyncHandler(async (request, response, next) => {
  const workout = await Workout.findById(request.params.id).populate('user')
  return response.json(workout)
}))

workoutRouter.put('/:id', asyncHandler(async (request, response, next) => {
  if(!request.body.content) {
    return response.status(400).send('New content missing')
  }
  await checkTokenGetUser(request.token)
  const workout = await Workout.findById(request.params.id)
    
  const moddedWorkout = { 
    ...workout.toObject(),
    content: request.body.content 
  }

  const result = await Workout.findByIdAndUpdate(request.params.id, moddedWorkout, { new: true })
    
  return response.status(200).json(result)
}))

workoutRouter.post('/new', asyncHandler(async (request, response, next) => {
  if(!request.body.content) {
    return response.status(400).send('Description or exercises missing')
  }
  
  const user = await checkTokenGetUser(request.token)
  const workout = create(Workout, request.body.content, request.body.picture, user.id)
  const savedWorkout = await workout.save()
  const workoutToReturn = await savedWorkout.populate('user').execPopulate()

  request.io.emit('user_add_workout', workoutToReturn)
  activityHelper.setActivity(user.id, 'workout', workoutToReturn._id)
  userUpdater.addToWorkouts(user.id, workoutToReturn._id)
    
  return response.status(201).json(workoutToReturn)
}))


workoutRouter.post('/:id/comment', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  const updatedWorkout = await comment(Workout, request, user)

  if (updatedWorkout === null) {
    return response.status(204).end()
  }

  activityHelper.setActivity(user.id, 'comment', updatedWorkout._id)
  return response.status(200).json(updatedWorkout)
}))

workoutRouter.post('/:id/like', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  const updatedWorkout = await like(Workout, request, user)
  if (updatedWorkout === null) {
    return response.status(204).end()
  }

  activityHelper.setActivity(user.id, 'like', updatedWorkout._id)
  request.io.emit('like_workout', { 
    username: user.username, 
    userid: user.id,
    workoutid: updatedWorkout._id 
  })

  return response.status(200).json(updatedWorkout)
}))

module.exports = workoutRouter