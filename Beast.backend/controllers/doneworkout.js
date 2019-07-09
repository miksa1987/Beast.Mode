const doneWorkoutRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { cloudinary, storage } = require('../util/imageupload')
const DoneWorkout = require('../models/DoneWorkout')
const config = require('../util/config')

const imgparser = multer({ storage })

doneWorkoutRouter.post('/', imgparser.single('image'), async (request, response) => {
  if(!request.token) response.status(401).end()

  try {
    const user = jwt.verify(request.token, config.SECRET)
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
    response.json(savedDoneWorkout)
  } catch(error) {
    response.status(400).send({ error })
  }
})

module.exports = doneWorkoutRouter