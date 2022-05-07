const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')


// function to check and verify user jwt token and catch errors
const auth = async (req, res, next) => {

  // check header
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
   const token = authHeader.split(' ')[1]
   console.log(token)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // attach the user to the task routes
   //const user = User.findById(payload.id).select('-password')
  //req.user = user

    req.user = { userId: payload.userId, name: payload.name, role: payload.role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth