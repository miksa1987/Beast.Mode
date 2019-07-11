const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./util/config')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
//const io = require('socket.io')(http)
const middleware = require('./util/middleware')

const userRouter = require('./controllers/user')
const postRouter = require('./controllers/post')
const workoutRouter = require('./controllers/workout')
const doneWorkoutRouter = require('./controllers/doneworkout')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')

//app.use((req, res, next) => {
//  res.io = io
//  next()
//})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(middleware.errorHandler)

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/workouts', workoutRouter)
app.use('/doneworkouts', doneWorkoutRouter)
app.use('/login', loginRouter)
app.use('/resetonlyifyouarecompletelysureaboutthis', resetRouter) // This has to be changed to TEST env variable only and different collection

mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Connected to MongoDB.')})
  .catch(error => { console.log(error.message) })

 http.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

module.exports = app