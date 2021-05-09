import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

// This is just a testing data
const importData = async () => {
  try {
    await Product.deleteMany()
    const createdUser = await User.findOne({email:adminEmail}) // Replace adminEmail with actual email string
    const adminUser = createdUser._id
    const sampleProducts = products.map(p => {
      return {...p, user: adminUser}
    })
    await Product.insertMany(sampleProducts)
    process.exit()
  }
  catch(err) {
    console.error(err.message)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    process.exit()
  }
  catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

if(process.argv[2] === '-d'){
  deleteData()
} else {
  importData()
}