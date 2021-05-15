import express from 'express'
import expressAsyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

router.get('/', expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
  // .then((products) => res.json(products))
  // .catch((err) => console.log(err.message))
  if(products) {
    res.json(products)
  }
  else {
    throw new Error('Products fetching failed')
  }
}))


router.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // .then((product) => {
  //   if(product) {
  //     res.json(product)
  //   } else {
  //     res.status(404).json({ message: "Product not found" })
  //   }
  // })
  //   .catch(err => { res.status(404).json({ message: "Product not found" })})
  if(product) {
    res.json(product)
  }
  else {
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