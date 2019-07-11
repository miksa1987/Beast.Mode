const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    request.token = auth.substring(7)
  } else {
    request.token = null
  }

  next()
}

const errorHandler = (request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JSonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  }

  next(error)
}

module.exports = { tokenExtractor, errorHandler }