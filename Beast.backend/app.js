const config = require('./util/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRouter = require('./controllers/user')
const postRouter = require('./controllers/post')
const workoutRouter = require('./controllers/workout')

app.use(cors())
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/workouts', workoutRouter)

mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Connected to MongoDB.')})
  .catch(error => { console.log(error.message) })

module.exports = app