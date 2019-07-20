const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('../util/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username })
    
    const passwordCorrect = user === null ? 
      false : await bcrypt.compare(request.body.password, user.passwordHash)

    console.log('password check')
    if(!user || !passwordCorrect) {
      response.status(400).json({ error:'Invalid username or password' })
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
      workouts: user.workouts
    }

    response.status(200).json(data)
  } catch (error) {
    console.log(error.message)
    response.status(400).json({ error: error.message })
  }
})

module.exports = loginRouter