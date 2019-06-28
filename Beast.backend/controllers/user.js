const config = require('../util/config')
const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.get('/all', (request, response) => {
  User.find({})
    .then(r => response.json(r))
})

userRouter.get('/:id', (request, response) => {
  User.findById(request.params.id)
    .then(r => response.json(r))
    .catch(e => response.status(404).send('User not found!'))
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

userRouter.post('/addfriend', async (request, response, next) => {
  const loggerUser = await jwt.verify(request.token, config.SECRET)
  const newFriend = await User.findById(response.newfriend)

  loggedUser.friends.push(newFriend.id)
  newFriend.friends.push(loggedUser.id)

  await loggerUser.save()
  await newFriend.save()

  response.io.emit('newfriend', newFriend)
  response.status(200).end()
})

module.exports = userRouter