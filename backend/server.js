const express = require('express');
const products = require('./data/products')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.get('/api/products',(req,res) => {
  res.json(products)
})


app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

app.listen(process.env.PORT || 5000, console.log(`Server is running at port ${process.env.PORT}`))