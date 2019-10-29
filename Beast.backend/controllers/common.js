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

module.exports = { asyncHandler, checkTokenGetUser }