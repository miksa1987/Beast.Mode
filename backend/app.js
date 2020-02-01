const mongoose            = require('mongoose')
const bodyParser          = require('body-parser')
const cors                = require('cors')
const morgan              = require('morgan')
const config              = require('./util/config')
const oldest              = require('./util/oldest')

const express             = require('express')
const app                 = express()
const http                = require('http').createServer(config.serverOptions, app)
const io                  = require('socket.io')(http)

const middleware          = require('./util/middleware')

const userRouter          = require('./controllers/user')
const postRouter          = require('./controllers/post')
const workoutRouter       = require('./controllers/workout')
const doneWorkoutRouter   = require('./controllers/doneworkout')
const loginRouter         = require('./controllers/login')
const searchRouter        = require('./controllers/search')
const imageRouter         = require('./controllers/image')
const resetRouter         = require('./controllers/reset')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use('/search', searchRouter)
app.use('/image', imageRouter)

app.use('/resetonlyifyouarecompletelysureaboutthis', resetRouter) // This has to be changed to TEST env variable only and different collection

app.use(middleware.errorHandler)

oldest.setOldest()

http.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

module.exports = app