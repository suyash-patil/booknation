import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const safe = asyncHandler(async (req,res,next) => {

  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next();
    }catch(err) {
      res.status(401).json('Not authorized')
    }
  }
  else {
    res.status(401).json('Not authorized')
  }
})

const admin = asyncHandler(async (req,res,next) => {
  const {email} = req.body
  const user = await User.findOne({email:email})
  if(user && user.isAdmin) {
    next()
  }
  else {
    res.status(401)
    throw new Error('Not authorized')
  }
})

export {safe,admin}