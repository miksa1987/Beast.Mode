const config                              = require('../util/config')
const userRouter                          = require('express').Router()
const User                                = require('../models/User')
const Post                                = require('../models/Post')
const Workout                             = require('../models/Workout')
const DoneWorkout                         = require('../models/DoneWorkout')
const bcrypt                              = require('bcrypt')
const jwt                                 = require('jsonwebtoken')
const activityHelper                      = require('../util/activity')
const dates                               = require('../util/dates')
const oldest                              = require('../util/oldest')
const { asyncHandler, checkTokenGetUser}  = require('./common')

userRouter.get('/all', asyncHandler(async (request, response, next) => {
  const users = await User.find({}).populate('friends')
  return response.json(users)
}))

userRouter.get('/randoms', asyncHandler(async (request, response, next) => {
  const users = await User.aggregate([{ $sample: { size: 25 }}])
  const modifiedUsers = users.map((user) => user = { ...user, id: user._id })
  return response.json(modifiedUsers)
}))

userRouter.get('/:id', asyncHandler(async (request, response, next) => {
  const user = await User.findById(request.params.id).populate('friends')
  return response.json(user).end()
}))

userRouter.get('/:id/name', asyncHandler(async (request, response, next) => {
  const user = await User.findById(request.params.id)
  const username = user.username
  return response.json(username)
}))

userRouter.get('/:id/posts', asyncHandler(async (request, response, next) => {
  const posts = await Post.find({ user: request.params.id }).populate('user')
  return response.status(200).json(posts)
}))

userRouter.get('/:id/workouts', asyncHandler(async (request, response, next) => {
  const workouts = await Workout.find({ user: request.params.id }).populate('user')
  return response.status(200).json(workouts)
}))

userRouter.get('/:id/doneworkouts', asyncHandler(async (request, response, next) => {
  const doneworkouts = await DoneWorkout.find({ user: request.params.id }).populate('user')
  return response.status(200).json(doneworkouts)
}))

userRouter.get('/:id/posts/skip/:skip', asyncHandler(async (request, response, next) => {
  const postsCount = await Post.countDocuments({ user: request.params.id })
  if (postsCount > Number(request.params.skip)) {
    const posts = await Post.find({ user: request.params.id })
      .sort({ _id: -1 })
      .skip(Number(request.params.skip))
      .limit(30)
      .populate('user')
    
    return response.json({ posts, end: false })
  }

  return response.json({ posts: [], end: true })
}))

userRouter.get('/:id/workouts/skip/:skip', asyncHandler(async (request, response, next) => {
  const workoutsCount = await Workout.countDocuments({ user: request.params.id })
  if (workoutsCount > Number(request.params.skip)) {
    const workouts = await Workout.find({ user: request.params.id })
      .sort({ _id: -1 })
      .skip(Number(request.params.skip))
      .limit(30)
      .populate('user')
    
    return response.json({ workouts, end: false })
  }

  return response.json({ workouts: [], end: true })
}))

userRouter.get('/:id/doneworkouts/skip/:skip', asyncHandler(async (request, response, next) => {
  const doneworkoutsCount = await Workout.countDocuments({ user: request.params.id })
  if (doneworkoutsCount > Number(request.params.skip)) {
    const doneworkouts = await Workout.find({ user: request.params.id })
      .sort({ _id: -1 })
      .skip(Number(request.params.skip))
      .limit(30)
      .populate('user')
    
    return response.json({ doneworkouts, end: false })
  }

  return response.json({ doneworkouts: [], end: true })
}))

userRouter.get('/:id/posts/:date', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  let [startdate, enddate] = dates.getFetchDates(request.params.date)

  if (oldest.getOldestPost() !== '') {
    const all = await Post.find({
      $and: [
        { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
          { user: user.id }
      ]}
    ]
  })
      
  if (all.length === 0) {
    return response.json({
      posts: [],
      startdate: dates.getDateString(oldest.getOldestPost()),
      enddate: dates.getDateString(enddate),
      end: true
    })
  }
  }

  dates.setFetchInterval(user.fetchInterval || -128)

  const posts = await Post.find({
    $and: [
        { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
        { user: user.id }
      ]}
    ]
  }).sort({ _id: 1 }).populate('user')

  const responsedata = {
    posts,
    startdate: dates.getDateString(startdate),
    enddate: dates.getDateString(enddate),
    end: false
  }

  return response.json(responsedata)
}))

userRouter.get('/:id/workouts/:date', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  let [startdate, enddate] = dates.getFetchDates(request.params.date)

  if (oldest.getOldestPost() !== '') {
    const all = await Workout.find({
      $and: [
          { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
          { user: user.id }
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

  dates.setFetchInterval(user.fetchInterval || -128)

  const workouts = await Workout.find({
    $and: [
      { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
      { user: user.id }
    ]}
  ]
  }).sort({ _id: 1 }).populate('user')

  const responsedata = {
    workouts,
    startdate: dates.getDateString(startdate),
    enddate: dates.getDateString(enddate),
    end: false
  }

  return response.json(responsedata)
}))

userRouter.get('/:id/doneworkouts/:date', asyncHandler(async (request, response, next) => {
  const user = await checkTokenGetUser(request.token)
  let [startdate, enddate] = dates.getFetchDates(request.params.date)

  if (oldest.getOldestDoneWorkout() !== '') {
    const all = await DoneWorkout.find({
      $and: [
          { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
          { user: user.id }
        ]}
      ]
    })
      
    if (all.length === 0) {
      return response.json({
        doneworkouts: [],
        startdate: dates.getDateString(oldest.getOldestDoneWorkout()),
        enddate: dates.getDateString(enddate),
        end: true
      })
    }
  }


  dates.setFetchInterval(user.fetchInterval || -128)

  const doneworkouts = await DoneWorkout.find({
    $and: [
      { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
      { user: user.id }
      ]}
    ]
  }).sort({ _id: 1 }).populate('user')

  const responsedata = {
    doneworkouts,
    startdate: dates.getDateString(startdate),
    enddate: dates.getDateString(enddate),
    end: false
  }

  return response.json(responsedata)
}))


userRouter.post('/new', asyncHandler(async (request, response, next) => {
    // This solution for now till I figure out why uniqueIgnoreCase on User model doesn't work
    const userCheck = await User.findOne({ username: {
      '$regex': `^${request.body.username}$`,
      '$options': 'i'
    }})
    if (userCheck) {
      return response.status(400).json({ error: 'Username taken!' })
    }

    const saltRounds = 10
    const pwHash = await bcrypt.hash(request.body.password, saltRounds)
    const user = new User({
      username: request.body.username,
      passwordHash: pwHash,
      picture: '',
      pictures: [],
      info: request.body.info || '',
      age: request.body.age || 0,
      activity: [],
      postCount: 0,
      workoutCount: 0,
      doneWorkoutCount: 0,
      friends: [],
      posts: [],
      workouts: [],
      doneWorkouts: [],
      fetchInterval: -128
    })

    const savedUser = await user.save()
    return response.status(201).json(savedUser)
}))

userRouter.post('/addfriend', asyncHandler(async (request, response, next) => {
    const user = await checkTokenGetUser(request.token)
    const newFriend = await User.findById(request.body.newfriend)

    if (user.friends.indexOf(newFriend.id) < 0) {
      user.friends = user.friends.concat(newFriend.id)
      newFriend.friends = newFriend.friends.concat(user.id)
    }
    
    const updatedUser = await user.save()
    await newFriend.save()

    request.io.emit('user_add_friend', newFriend)
    activityHelper.setActivity(user.id, 'addfriend', newFriend.id)
    return response.json(updatedUser)
}))

userRouter.post('/removefriend', asyncHandler(async (request, response, next) => {
    const user = await checkTokenGetUser(request.token)
    
    if (!request.body.friendToRemove) {
      return response.status(400).json({ error: 'Friend to remove missing' })
    }
    
    await User.updateOne( { _id: user.id }, { "$pull": { "friends": request.body.friendToRemove } })
    await User.updateOne( { _id: request.body.friendToRemove }, { "$pull": { "friends": user.id } })
    const updatedUser = await User.findById(user.id)
   
    return response.json(updatedUser)
}))

userRouter.put('/me', asyncHandler(async (request, response, next) => {
    const user = await checkTokenGetUser(request.token)

    if (!user) {
      return response.status(401).end()
    }
    
    const newPwHash = request.body.password !== '' ? 
      await bcrypt.hash(request.body.password, 10) : null

    const userToUpdate = {
      ...user.toObject(),
      passwordHash: request.body.password !== '' ? newPwHash : user.passwordHash,
      picture: request.body.image ? request.body.image : user.picture,
      info: request.body.info ? request.body.info : user.info,
      email: request.body.email ? request.body.email : user.email
    }

    const updatedUser = await User.findByIdAndUpdate(user.id, userToUpdate, { new: true })
    return response.json(updatedUser)
}))

module.exports = userRouter