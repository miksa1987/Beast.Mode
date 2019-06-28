const config = require('../util/config')
const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.get('/all', async (request, response) => {
  const users = await User.find({}).populate('friends')
  response.json(users)
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
  const body = request.body
  const token = request.body.token

  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken.id) {
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

module.exports = userRouter