import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.use('/api/products',productRoutes)

app.listen(process.env.PORT || 5000, console.log(`Server is running at port ${process.env.PORT}`))