import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products',productRoutes)

app.use('/api/users',userRoutes)

app.use('/api/order',orderRoutes)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.listen(process.env.PORT || 5000, console.log(`Server is running at port ${process.env.PORT}`))