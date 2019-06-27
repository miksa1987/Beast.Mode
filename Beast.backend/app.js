const config = require('./util/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./controllers/user')

app.use(bodyParser)

app.use('/users', userRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Connected to MongoDB.')})
  .catch(error => { console.log(error.message) })

module.exports = app