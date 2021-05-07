import express from 'express'
import expressAsyncHandler from "express-async-handler";
const router = express.Router()
import Order from '../models/orderModel.js'

router.post('/',expressAsyncHandler(async (req,res) => {
  const {orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice,_id} = req.body
  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No items')
    return
  }
  else {
    const order = new Order({
      orderItems,
      user: _id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
}))

export default router