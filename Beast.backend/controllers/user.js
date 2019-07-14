const config = require('../util/config')
const userRouter = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Workout = require('../models/Workout')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { cloudinary, imgparser } = require('../util/imageupload')

userRouter.get('/all', async (request, response) => {
  const users = await User.find({}).populate('friends')
  response.status(200).json(users)
})

userRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate('friends')
    response.status(200).json(user)
  } catch(error) {
    response.status(404).send('User not found!')
  }
})

userRouter.get('/:id/name', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
    const username = user.username
    response.status(200).json(username)
  } catch(error) {
    response.status(404).send('User not found!')
  }
})

userRouter.get('/:id/posts', async (request, response) => {
  try {
    const posts = await Post.find({ user: request.params.id }).populate('user')
    response.status(200).json(posts)
  } catch(error) {
    response.status(404).end()
  }
})

userRouter.get('/:id/workouts', async (request, response) => {
  try {
    const workouts = await Workout.find({ user: request.params.id }).populate('user')
    response.status(200).json(workouts)
  } catch(error) {
    response.status(404).end()
  }
})

userRouter.post('/new', async (request, response) => {
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
    doneWorkouts: []
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.post('/addfriend', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const newFriend = await User.findById(request.body.newfriend)

    user.friends = user.friends.concat(newFriend.id)
    newFriend.friends = newFriend.friends.concat(user.id)

    await user.save()
    await newFriend.save()

    response.status(200).end()
  } catch(e) {
    response.status(400).json({ error: e.message })
  }
})

userRouter.put('/me', imgparser.single('image'), async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    request.body.file ?
      await cloudinary.uploader.upload_stream(request.file.buffer, { resource_type: 'raw' }).end(request.file.buffer)
      : null

    const newPwHash = request.body.password ? 
      await bcrypt.hash(request.body.password, 10) : null

    const userToUpdate = {
      username: user.username,
      passwordHash: request.body.password ? newPwHash : user.passwordHash,
      picture: request.file ? request.file.secure_url : user.picture,
      pictures: user.pictures,
      info: request.body.info ? request.body.info : user.info,
      age: request.body.age ? request.body.age : user.age,
      activity: user.activity,
      postCount: user.postCount,
      workoutCount: user.workoutCount,
      doneWorkoutCount: user.doneWorkoutCount,
      friends: user.friends,
      posts: user.posts,
      workouts: user.workouts,
      doneWorkouts: user.doneWorkouts
    }

    const updatedUser = await User.findByIdAndUpdate(decodedToken.id, userToUpdate, { new: true })
    response.status(200).json(updatedUser)
  } catch(error) {
    console.log(error.message)
    response.status(400).json({ error: error.message })
  }
})

module.exports = userRouter