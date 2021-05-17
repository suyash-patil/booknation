import express from 'express'
import expressAsyncHandler from "express-async-handler";
const router = express.Router()
import mongoose from 'mongoose'
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

router.get('/:id', expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email')

  if(order) {
    res.json(order)
  }
  else {
    res.status(404)
    throw new Error('Not found')
  }

}))

router.put('/:id/pay', expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
  else {
    res.status(404)
    throw new Error('Not found')
  }

}))

router.get('/getorders/:id',expressAsyncHandler(async(req,res) =>{
  const orders = await Order.find({user:req.params.id})
  if(orders) {
    res.json(orders)
  }
  else {

  }

}))

router.post('/getallorders', expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name')
  if(orders) {
    res.json(orders)
  }
  else {

  }

}))

router.put('/:id/delivered', expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
  else {
    res.status(404)
    throw new Error('Not found')
  }

}))

export default router