const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./util/config')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const userRouter = require('./controllers/user')
const postRouter = require('./controllers/post')
const workoutRouter = require('./controllers/workout')
const loginRouter = require('./controllers/login')

app.use((req, res, next) => {
  res.io = io
  next()
})

app.use(cors())
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/workouts', workoutRouter)
app.use('/login', loginRouter)

mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Connected to MongoDB.')})
  .catch(error => { console.log(error.message) })

http.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})