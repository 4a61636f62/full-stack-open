const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  try {
    request.user = await User.findById(decodedToken.id)
    next()
  } catch(exception) {
    next(exception)
  }
}

// const userExtractor = (request, response, next) => {
//   const token = request.token
//   console.log(token)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   User.findById(decodedToken.id).then(user => {
//     request.user = user
//     console.log(user)
//   }).catch(error =>
//     next(error)
//   )
//   next()
// }

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor, userExtractor, errorHandler
}