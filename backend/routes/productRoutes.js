import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'

router.get('/', async (req, res) => {
  await Product.find({})
  .then((products) => res.json(products))
  .catch((err) => console.log(err.message))
})


router.get('/:id', async (req, res) => {
  await Product.findById(req.params.id)
  .then((product) => {
    if(product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  })
    .catch(err => { res.status(404).json({ message: "Product not found" })})
})

export default router