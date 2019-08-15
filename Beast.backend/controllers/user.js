const config                      = require('../util/config')
const userRouter                  = require('express').Router()
const User                        = require('../models/User')
const Post                        = require('../models/Post')
const Workout                     = require('../models/Workout')
const DoneWorkout                 = require('../models/DoneWorkout')
const bcrypt                      = require('bcrypt')
const jwt                         = require('jsonwebtoken')
const activityHelper              = require('../util/activity')
const dates                       = require('../util/dates')
const oldest                      = require('../util/oldest')

userRouter.get('/all', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('friends')
    return response.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/randoms', async (request, response, next) => {
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
    next(error)
  }
})

userRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate('friends')
    return response.status(200).json(user).end()
  } catch(error) {
    next(error)
  }
})

userRouter.get('/:id/name', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    const username = user.username
    return response.status(200).json(username)
  } catch(error) {
    next(error)
  }
})

userRouter.get('/:id/posts', async (request, response, next) => {
  try {
    const posts = await Post.find({ user: request.params.id }).populate('user')
    return response.status(200).json(posts)
  } catch(error) {
    next(error)
  }
})

userRouter.get('/:id/workouts', async (request, response, next) => {
  try {
    const workouts = await Workout.find({ user: request.params.id }).populate('user')
    return response.status(200).json(workouts)
  } catch(error) {
    next(error)
  }
})

userRouter.get('/:id/doneworkouts', async (request, response, next) => {
  try {
    const doneworkouts = await DoneWorkout.find({ user: request.params.id }).populate('user')
    return response.status(200).json(doneworkouts)
  } catch(error) {
    next(error)
  }
})

userRouter.get('/:id/posts/:date', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    if (oldest.getOldestPost() !== '') {
      const all = await Post.find({
        $and: [
            { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
            { user: decodedToken.id }
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

    const user = await User.findById(decodedToken.id)
    dates.setFetchInterval(user.fetchInterval || -128)

    const posts = await Post.find({
      $and: [
          { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
          { user: decodedToken.id }
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
  } catch (error) {
    next(error)
  }
})

userRouter.get('/:id/workouts/:date', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }

  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    if (oldest.getOldestPost() !== '') {
      const all = await Workout.find({
        $and: [
            { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
            { user: decodedToken.id }
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

    const user = await User.findById(decodedToken.id)
    dates.setFetchInterval(user.fetchInterval || -128)

    const workouts = await Workout.find({
      $and: [
        { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
        { user: decodedToken.id }
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
  } catch (error) {
    next(error)
  }
})

userRouter.get('/:id/doneworkouts/:date', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).end()
  }
  
  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }
  
  try {
    let [startdate, enddate] = dates.getFetchDates(request.params.date)

    if (oldest.getOldestDoneWorkout() !== '') {
      const all = await DoneWorkout.find({
        $and: [
            { $and: [ { date: { $gte: oldest.getOldestPost() }}, { date: { $lte: enddate }},
            { user: decodedToken.id }
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


    const user = await User.findById(decodedToken.id)
    dates.setFetchInterval(user.fetchInterval || -128)

    const doneworkouts = await DoneWorkout.find({
      $and: [
        { $and: [ { date: { $gte: startdate }}, { date: { $lte: enddate }},
        { user: decodedToken.id }
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
  } catch (error) {
    next(error)
  }
})


userRouter.post('/new', async (request, response, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
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
    next(error)
  }
})

userRouter.post('/removefriend', async (request, response, next) => {
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
    next(error)
  }
})

userRouter.put('/me', async (request, response, next) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

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

    const updatedUser = await User.findByIdAndUpdate(decodedToken.id, userToUpdate, { new: true })
    return response.status(200).json(updatedUser)
  } catch(error) {
    next(error)
  }
})

module.exports = userRouter