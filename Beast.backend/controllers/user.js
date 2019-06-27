const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.get('/all', (request, response) => {
  User.find({})
    .then(r => response.json(r))
})

userRouter.post('/new', async (request, response) => {
  const saltRounds = 10
  const pwHash = await bcrypt.hash(request.body.password, saltRounds)
  const user = new User({
    username: request.body.username,
    passwordHash: pwHash,
    friends: [],
    posts: [],
    workouts: []
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = userRouter