const jwt           = require('jsonwebtoken')
const bcrypt        = require('bcrypt')
const User          = require('../models/User')
const config        = require('../util/config')
const dates         = require('../util/dates')
const userUpdater   = require('../util/userUpdater')
const loginRouter   = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
  try {
    const user = await User.findOne({ username: new RegExp(`^${request.body.username}`, 'i')})
    
    const passwordCorrect = user === null ? 
      false : await bcrypt.compare(request.body.password, user.passwordHash)

    if(!user || !passwordCorrect) {
      return response.status(401).json({ error:'Invalid username or password' })
    }
    
    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = await jwt.sign(userForToken, config.SECRET)
    dates.setFetchInterval(userUpdater.calculateFetchInterval(user))

    const userWithFetchInterval = {
      ...user.toObject(),
      fetchInterval: dates.fetchInterval
    }
    User.findByIdAndUpdate(user.id, userWithFetchInterval, { new: true })

    const data = { 
      token: token, 
      username: user.username, 
      picture: user.picture,
      id: user.id,
      friends: user.friends,
      posts: user.posts,
      workouts: user.workouts,
      doneworkouts: user.doneWorkouts,
      activity: user.activity,
      fetchInterval: dates.fetchInterval
    }

    return response.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

// This might have to be moved somewhere else..
loginRouter.post('/setfetch', async (request, response) => {
  if (!request.body.fetchInterval) {
    return response.status(400).json({ error: 'no fetch interval provided'})
  }
  if (!request.token) {
    return response.status(401).end()
  }

  const decodedToken = jwt.verify(request.token, config.SECRET)
  const user = await User.findById(decodedToken.id)

  dates.setFetchInterval(userUpdater.calculateFetchInterval(user))
  const userWithFetchInterval = {
    ...user.toObject(),
    fetchInterval: dates.fetchInterval
  }

  User.findByIdAndUpdate(user.id, userWithFetchInterval, { new: true })
  return response.json({ fetchInterval: dates.fetchInterval })
})

module.exports = loginRouter