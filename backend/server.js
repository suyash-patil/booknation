import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import pdf from 'html-pdf'
import template from './utils/document.js'

dotenv.config()


connectDB()

const app = express()
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/products',productRoutes)

app.use('/api/users',userRoutes)

app.use('/api/order',orderRoutes)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/api/create-pdf',(req,res) => {
  pdf.create(template(req.body),{}).toFile('result.pdf',(err) => {
    if(err) {
      res.send(Promise.reject())
    }
    res.send(Promise.resolve())
  })
})
app.get('/api/fetch-pdf',(req,res) => {
  res.sendFile('result.pdf',{root: '.'})
})


app.listen(process.env.PORT || 5000, console.log(`Server is running at port ${process.env.PORT}`))