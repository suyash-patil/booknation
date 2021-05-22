import express from 'express'
import expressAsyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

router.get('/', expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
  if(products) {
    res.json(products)
  }
  else {
    throw new Error('Products fetching failed')
  }
}))


router.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    res.json(product)
  }
  else {
    throw new Error('Product not found')
  }
}))

router.route('/:id/review').post(expressAsyncHandler(async(req,res) => {
  const {name, comment, _id, rating} = req.body
  const product = await Product.findById(req.params.id)
  if(product) {
    const review = {
      name: name,
      rating: Number(rating),
      comment:comment,
      user: _id
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = Number(product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length).toFixed(1)
    await product.save()
    res.status(201).json(product)

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}))

router.route('/delete/:id').delete(expressAsyncHandler(async(req,res) => {
  const product = await Product.findById(req.params.id)
  if(product){
    await product.remove()
    res.json({message:'Product removed'})
  }
  else {
    res.status(404)
    throw new Error('Product not found')
  }
}))

router.route('/create').post(expressAsyncHandler(async (req, res) => {
  const {name,price,image,author,countInStock,description,_id} = req.body
  const product = new Product({
    name: name,
    price: price,
    user: _id,
    image: image,
    author: author,
    countInStock: countInStock,
    numReviews: 0,
    description: description
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

}))

router.route('/update/:id').put(expressAsyncHandler(async (req, res) => {
  const {name,price,author,description,image,countInStock} = req.body

  const product = await Product.findById(req.params.id)
  if(product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.author = author
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }
  else {
    res.status(404)
    throw new Error('Product not found')
  }

}))

export default router