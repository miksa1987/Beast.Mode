const imageRouter                         = require('express').Router()
const { cloudinary, imgparser }           = require('../util/imageupload')
const { asyncHandler, checkTokenGetUser}  = require('./common')
const config                              = require('../util/config')

imageRouter.post('/new', imgparser.single('image'), asyncHandler(async (request, response, next) => {
  if (!request.file) {
    return response.status(400).json({ error: 'File missing' })
  }

  await checkTokenGetUser(request.user)

  await cloudinary.uploader.upload_stream(request.file.buffer, { 
    resource_type: 'raw' }).end(request.file.buffer)
  const splittedUri = request.file.secure_url.split('upload')
  const imageuri = splittedUri[0].concat('upload/w_1280').concat(splittedUri[1])

  return response.json({ imageuri })
}))

module.exports = imageRouter