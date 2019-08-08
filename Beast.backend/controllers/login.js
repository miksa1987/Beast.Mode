const jwt           = require('jsonwebtoken')
const bcrypt        = require('bcrypt')
const User          = require('../models/User')
const Post          = require('../models/Post')
const DoneWorkout   = require('../models/DoneWorkout')
const config        = require('../util/config')
const dates         = require('../util/dates')
const loginRouter   = require('express').Router()

loginRouter.post('/', async (request, response) => {
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

    const friendsPostCount = await Post.countDocuments({ user: { $in: user.friends }})
    const friendsDoneworkoutCount = await DoneWorkout.countDocuments({ user: { $in: user.friends }})
    const total = friendsPostCount + friendsDoneworkoutCount + user.posts.length + user.doneWorkouts.length
    
    if (total < 50) dates.setFetchInterval(-384)
    if (total < 150 && total > 50) dates.setFetchInterval(-192)
    if (total < 300 && total > 150) dates.setFetchInterval(-96)
    if (total < 1000 && total > 300) dates.setFetchInterval(-24)
    if (total < 1500 && total > 1000) dates.setFetchInterval(-12)
    if (total < 2500 && total > 1500) dates.setFetchInterval(-6)
    if (total > 2500) dates.setFetchInterval(-4)

    const data = { 
      token: token, 
      username: user.username, 
      picture: user.picture,
      id: user.id,
      friends: user.friends,
      posts: user.posts,
      workouts: user.workouts,
      doneworkouts: user.doneWorkouts,
      fetchInterval: dates.fetchInterval
    }

    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

// This might have to be moved somewhere else..
loginRouter.post('/setfetch', async (request, response) => {
  if (!request.body.fetchInterval) {
    return response.status(400).json({ error: 'no fetch interval provided'})
  }
  dates.setFetchInterval(request.body.fetchInterval)
  console.log(`fetch interval set to ${dates.fetchInterval}`)
  return response.status(200).end()
})

module.exports = loginRouter