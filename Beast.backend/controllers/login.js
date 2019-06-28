const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('../util/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username })
  const passwordCorrect = user === null ? 
    false : bcrypt.compare(request.body.password, user.passwordHash)

  if(!user || !passwordCorrect) {
    response.status(400).send('Invalid username or password')
  }

  const userForToken = {
    username: user.username,
    id: user.id
  } // Sorry, matskussa oli niin hyviä muuttujanimiä etten itse keksi parempia :D

  const token = jwt.sign(userForToken, config.SECRET)
  const data = { token: token, username: user.username, id: user.id }

  response.json(data)
})

module.exports = loginRouter