const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./util/config')

const express = require('express')
const app = express()
const http = require('http').createServer(config.serverOptions, app)
const io = require('socket.io')(http)

const middleware = require('./util/middleware')
const sockets = require('./util/sockets')

const userRouter = require('./controllers/user')
const postRouter = require('./controllers/post')
const workoutRouter = require('./controllers/workout')
const doneWorkoutRouter = require('./controllers/doneworkout')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Connected to MongoDB.')})
  .catch(error => { console.log(error.message) })

app.use(cors())
app.use(express.static('build'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use((request, response, next) => {
  request.io = io
  next()
})

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/workouts', workoutRouter)
app.use('/doneworkouts', doneWorkoutRouter)
app.use('/login', loginRouter)
app.use('/resetonlyifyouarecompletelysureaboutthis', resetRouter) // This has to be changed to TEST env variable only and different collection

app.use(middleware.errorHandler) // This might cause the whole shit to crash and burn....

// for testing
let socketsList = []

io.on('connection', (socket) => {
  socket.on('connect_user', (userid) => {
    const newSocket = { ...socket, userid: userid }
    sockets.connectUser(newSocket)
  })

  socket.on('disconnect_user', (userid) => {
    sockets.disconnectUser(userid)
    console.log(`disconnected user ${userid}`)
  })
})

http.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

module.exports = app