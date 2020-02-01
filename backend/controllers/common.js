const User                = require('../models/User')
const jwt                 = require('jsonwebtoken')
const { SECRET }          = require('../util/config')

const asyncHandler = (func) => (request, response, next) => 
  Promise.resolve(func(request, response, next)).catch(next)

const checkTokenGetUser = async (token) => {
  const decodedToken = await jwt.verify(token, SECRET)
  const user = await User.findById(decodedToken.id)

  if (!user) {
    throw new Error('unauthorized')
  }
  return user
}

const create = (Model, content, picture, user) => {
  return new Model({
    content,
    picture,
    user,
    likes: [],
    comments: [],
  })
}

const like = async (Model, request, user) => {
  return await Model.findOneAndUpdate(
    { "_id": request.params.id, "likes": { $ne: user.id } },
    { $push: { "likes": user.id }, $inc: { "likesLength": 1 }},
    { new: true }).populate('user')
}

const comment = async (Model, request, user) => {
  return await Model.findOneAndUpdate(
    { "_id": request.params.id },
    { $push: { "comments": {
      "content": request.body.comment,
      "user": user.username,
      "userid": user.id,
      "date": new Date()
    }}},
    { new: true }).populate('user')
}

module.exports = { asyncHandler, checkTokenGetUser, create, like, comment }