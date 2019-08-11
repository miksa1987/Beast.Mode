const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    request.token = auth.substring(7)
  } else {
    request.token = null
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JSonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  } else {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { tokenExtractor, errorHandler }