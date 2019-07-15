const doneWorkoutRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { cloudinary, storage } = require('../util/imageupload')
const DoneWorkout = require('../models/DoneWorkout')
const config = require('../util/config')

const imgparser = multer({ storage })

doneWorkoutRouter.post('/new', imgparser.single('image'), async (request, response) => {
  if(!request.token) response.status(401).end()

  try {
    const user = jwt.verify(request.token, config.SECRET) // WTF?!
    if(!user.id) response.status(401).end()

    await cloudinary.uploader.upload(request.file.path)
    const doneWorkout = new DoneWorkout({
      content: request.body.content,
      additional: request.body.additional,
      picture: '',
      user: user.id,
      likes: 0,
      comments: [],
      done: {
        date: request.body.done.date,
        time: request.body.done.time,
        done: true
      }
    })

    const savedDoneWorkout = await doneWorkout.save()
    response.status(201).json(savedDoneWorkout)
  } catch (error) {
    response.status(400).send({ error })
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

  }
})

module.exports = doneWorkoutRouter