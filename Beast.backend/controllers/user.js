const config = require('../util/config')
const userRouter = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Workout = require('../models/Workout')
const DoneWorkout = require('../models/DoneWorkout')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { cloudinary, imgparser } = require('../util/imageupload')
const activityHelper = require('../util/activity')
const dates = require('../util/dates')

userRouter.get('/all', async (request, response) => {
  try {
    const users = await User.find({}).populate('friends')
    return response.status(200).json(users)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

userRouter.get('/randoms', async (request, response) => {
  try {
    const users = await User.find({}).populate('friends')
    
    if (users.length < 25) return response.status(200).json(users)

    let randomUsers = []
    if(users.length > 35) {
      for (let i = 0; i < 25; i++) {
        let random = Math.floor(Math.random() * users.length)
        const userids = randomUsers.map(user => user.id) 
        while (userids.indexOf(users[random].id) < 0) random = Math.floor(Math.random() * users.length)

        randomUsers = randomUsers.concat(users[random])
      }
    }

    return response.status(200).json(randomUsers)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

userRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate('friends')
    console.log(user)
    return response.status(200).json(user).end()
  } catch(error) {
    return response.status(404).send('User not found!')
  }
})

userRouter.get('/:id/name', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
    const username = user.username
    return response.status(200).json(username)
  } catch(error) {
    return response.status(404).send('User not found!')
  }
})

userRouter.get('/:id/posts', async (request, response) => {
  try {
    const posts = await Post.find({ user: request.params.id }).populate('user')
    return response.status(200).json(posts)
  } catch(error) {
    return response.status(404).end()
  }
})

userRouter.get('/:id/workouts', async (request, response) => {
  try {
    const workouts = await Workout.find({ user: request.params.id }).populate('user')
    return response.status(200).json(workouts)
  } catch(error) {
    return response.status(404).end()
  }
})

userRouter.get('/:id/doneworkouts', async (request, response) => {
  try {
    const doneworkouts = await DoneWorkout.find({ user: request.params.id }).populate('user')
    return response.status(200).json(doneworkouts)
  } catch(error) {
    return response.status(404).end()
  }
})

userRouter.get('/:id/posts/:date', async (request, response) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  const user = await User.findById(decodedToken.id)

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    let posts = await Post.find({
      $and: [
          { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
          { _id: decodedToken.id }
        ]}
      ]
    }).sort({ _id: 1 })

    const responsedata = {
      posts,
      startdate,
      enddate,
      end: false
    }

    return response.json(responsedata)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

userRouter.get('/:id/doneworkouts/:date', async (request, response) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  const user = await User.findById(decodedToken.id)

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    let posts = await DoneWorkout.find({
      $and: [
          { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
          { _id: decodedToken.id }
        ]}
      ]
    }).sort({ _id: 1 })

    const responsedata = {
      doneworkouts,
      startdate,
      enddate,
      end: false
    }

    return response.json(responsedata)
  } catch (error) {
    return response.status(400).json({ error: error.message })
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
  return response.status(201).json(savedUser)
})

userRouter.post('/addfriend', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const newFriend = await User.findById(request.body.newfriend)

    if (user.friends.indexOf(newFriend.id) < 0) {
      user.friends = user.friends.concat(newFriend.id)
      newFriend.friends = newFriend.friends.concat(user.id)
    }
    
    const updatedUser = await user.save()
    await newFriend.save()

    request.io.emit('user_add_friend', newFriend)
    activityHelper.setActivity(decodedToken.id, 'addfriend', newFriend.id)
    return response.status(200).json(updatedUser)
  } catch(error) {
    return response.status(400).json({ error: error.message })
  }
})

userRouter.post('/removefriend', async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!request.body.friendToRemove) {
      return response.status(400).json({ error: 'Friend to remove missing' })
    }
    
    await User.updateOne( { _id: decodedToken.id }, { "$pull": { "friends": request.body.friendToRemove } })
    await User.updateOne( { _id: request.body.friendToRemove }, { "$pull": { "friends": decodedToken.id } })
    const updatedUser = await User.findById(decodedToken.id)
   
    return response.json(updatedUser)
  } catch (error) {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
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
    const splittedUri = request.file ? request.file.secure_url.split('upload') : ''
    const imageUri = request.file ? 
      splittedUri[0].concat('upload/w_1280').concat(splittedUri[1]) : ''

    const newPwHash = request.body.password ? 
      await bcrypt.hash(request.body.password, 10) : null

    const userToUpdate = {
      username: user.username,
      passwordHash: request.body.password ? newPwHash : user.passwordHash,
      picture: request.file ? imageUri : user.picture,
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
    return response.status(200).json(updatedUser)
  } catch(error) {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
})

module.exports = userRouter