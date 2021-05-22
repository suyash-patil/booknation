import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import {safe,admin} from '../middleware/authMiddleware.js'
const router = express.Router()
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
router.post('/login', expressAsyncHandler(async (req,res) => {
  const {email, password} = req.body
  const user = await User.findOne({email: email})
  if(user && await user.matchPass(password)){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
  }
  else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
}))

router.route('/profile').post(expressAsyncHandler(async (req, res) => {
  const {email} = req.body
  const user = await User.findOne({email:email})
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  }
  else {
    throw new Error('User not found')
  }
}))

router.route('/profile/update').put( expressAsyncHandler(async (req, res) => {
  const {email,name,oldpassword,newpass} = req.body
  const user = await User.findOne({email:email})
  if (user) {
    user.name = name || user.name
    if(oldpassword) {
      if (!await user.matchPass(oldpassword)){
        throw new Error('The password you entered doesn\'t match the records')
        return
      }
    }
    if (oldpassword && await user.matchPass(oldpassword)) {
      user.password = newpass
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })

  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
}))

router.route('/register').post( expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({email:email})

  if(userExist) {
    res.status(401)
    throw new Error('User already exist')
  }
  else {
    const user = await User.create({
      name,
      email,
      password
    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
    }
    else {
      res.json(401)
      throw new Error('Invalid Email and Password')

    }
  }
}))

router.route('/').post(admin, expressAsyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
}))

router.route('/delete/:id').delete(expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    await user.remove()
    res.json({message: 'User removed'})
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
}))

router.route('/getuser/:id').get(expressAsyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id)
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  })
}))

router.route('/edituser/:id').put(expressAsyncHandler(async(req,res) => {
  const {name,isAdmin} = req.body
  const user = await User.findById(req.params.id)
  if(user) {
    user.name = name || user.name
    user.isAdmin = isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
}))

export default router