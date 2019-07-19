const doneWorkoutRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { cloudinary, storage } = require('../util/imageupload')
const DoneWorkout = require('../models/DoneWorkout')
const config = require('../util/config')

const imgparser = multer({ storage })

doneWorkoutRouter.get('/all', async (request, response) => {
  try {
    const doneWorkouts = await DoneWorkout.find({})
    response.status(200).json(doneWorkouts)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

doneWorkoutRouter.get('/:id', async (request, response) => {
  try {
    const doneWorkout = await DoneWorkout.findById(request.params.id)
    response.status(200).json(doneWorkout)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

doneWorkoutRouter.post('/new', imgparser.single('image'), async (request, response) => {
  if (!request.token) response.status(401).end()

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) response.status(401).end()
    
    if (request.file) {
      await cloudinary.uploader.upload_stream(request.file.buffer, { resource_type: 'raw' }).end(request.file.buffer)
      userUpdater.addToPictures(decodedToken.id, request.file.secure_url)
    }

    const splittedUri = request.file ? request.file.secure_url.split('upload') : ''
    const imageUri = request.file ? 
      splittedUri[0].concat('upload/w_1280').concat(splittedUri[1]) : ''

    const doneWorkout = new DoneWorkout({
      content: request.body.content,
      additional: request.body.additional,
      picture: request.file ? imageUri : '',
      user: decodedToken.id,
      likes: [],
      comments: [],
      type: 'doneworkout',
      done: {
        date: new Date(),
        time: request.body.time,
        done: true
      }
    })
    console.log(doneWorkout)

    const savedDoneWorkout = await doneWorkout.save()
    console.log(savedDoneWorkout)
    response.status(201).json(savedDoneWorkout)
  } catch (error) {
    console.log(error.message)
    response.status(400).send({ error: error.message })
  }
})

doneWorkoutRouter.post('/:id/comment', async (request, response) => {
  if (!request.token) response.status(401).end()
  
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) response.status(401).end()

    const user = await user.findById(decodedToken.id)
    const doneWorkout = await DoneWorkout.findById(request.params.id)

    const newComments = doneWorkout.comments.concat(request.body.comment)
    const doneWorkoutToUpdate = { ...doneWorkout.toObject(), comments: newComments }

    const updatedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true })

    response.status(200).json(updatedDoneWorkout)

  } catch (error) {
    response.status(400).json({ error: error.message})
  }
})

doneWorkoutRouter.post('/:id/like', async (request, response) => {
  try {
    const doneWorkout = await DoneWorkout.findById(request.params.id)
    const decodedToken = await jwt.verify(request.token, config.SECRET)

    if(!decodedToken) {
      response.status(401).end()
    }
    if(!doneWorkout) {
      response.status(400).end()
    }

    let newLikes = doneWorkout.likes.filter(like => like !== decodedToken.id)
    if (newLikes.length === 0) {
      newLikes = doneWorkout.likes.concat(decodedToken.id)
    }

    const doneWorkoutToUpdate = {
      ...doneWorkout.toObject(),
      comments: post.comments
    }
    
    activityHelper.setActivity(decodedToken.id, 'like', doneWorkout._id)
    const updatedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true }).populate('user')
    response.status(200).json(updatedDoneWorkout)
  } catch(e) {
    console.log(e.message)
    response.status(400).send({ error: e.message })
  }
})

doneWorkoutRouter.put('/:id', async (request, response) => {
  if(!request.token) {
    response.status(401).end()
  }
  if(!request.body.content) {
    response.status(400).send('New content missing')
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const doneWorkout = await DoneWorkout.findById(request.params.id)
    
    const doneWorkoutToUpdate = { 
      ...doneWorkout.toObject(),
      content: request.body.content 
    }

    const savedDoneWorkout = await DoneWorkout.findByIdAndUpdate(request.params.id, doneWorkoutToUpdate, { new: true })
    
    response.status(200).json(savedDoneWorkout)
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
})


module.exports = doneWorkoutRouter