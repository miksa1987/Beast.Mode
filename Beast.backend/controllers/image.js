const imageRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { cloudinary, imgparser } = require('../util/imageupload')
const config = require('../util/config')

imageRouter.post('/new', imgparser.single('image'), async (request, response) => {
  if (!request.token) {
    return response.status(401).end()
  }
  if (!request.file) {
    return response.status(400).json({ error: 'File missing' })
  }

  const decodedToken = await jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).end()
  }

  try {
    await cloudinary.uploader.upload_stream(request.file.buffer, { 
      resource_type: 'raw' }).end(request.file.buffer)
    const splittedUri = request.file.secure_url.split('upload')
    const imageuri = splittedUri[0].concat('upload/w_1280').concat(splittedUri[1])

    return response.json({ imageuri })
  } catch (error) {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
}) 

module.exports = imageRouter