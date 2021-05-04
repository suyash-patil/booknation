import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import safe from '../middleware/authMiddleware.js'
const router = express.Router()
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
router.post('/login', async (req,res) => {
  const {email, password} = req.body
  // const user = await User.findOne({email: email})
  //   .then(if (user && (await user.matchPass(password))) {
  //     res.json({
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //       token: null
  //     })
  //   }
  // else {
  //   res.status(401)
  //   throw new Error('Invalid user')
  // })
  await User.findOne({email: email})
  .then(async (user) => {
    await user.matchPass(password)
    .then((pass) => {
      pass ? res.json({
        _id: user._id,
        name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id)
      }) : (res.status(401).json(`Invalid email or password`))
    })
    .catch((err) => console.log(error))
  })
    .catch(() => res.status(401).json('Invalid email or password'))
})

router.route('/profile').get(safe, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }
  else {
    res.status(404).json('User not found')
  }
}))

router.route('/register').post( expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({email})

  if(userExist) {
    res.status(400).json('User already exist with given email')
  }

  const user = await User.create({
    name,
    email,
    password
  })
  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(400).json('Invalid Data')
  }
}))

export default router