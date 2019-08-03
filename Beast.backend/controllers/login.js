const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('../util/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  try {
    const user = await User.findOne({ username: new RegExp(`^${request.body.username}`, 'i')})
    
    console.log(user)
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
    const data = { 
      token: token, 
      username: user.username, 
      picture: user.picture,
      id: user.id,
      friends: user.friends,
      posts: user.posts,
      workouts: user.workouts,
      doneworkouts: user.doneWorkouts
    }

    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = loginRouter