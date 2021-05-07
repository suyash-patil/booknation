import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {PayPalButton} from 'react-paypal-button-v2'

const CompleteOrderScreen = ({history,match}) => {
  const orderId = match.params.id
  const [order,setOrder] = useState({})
  const [sdk,setSdk] = useState(false)
  const abortControl = new AbortController()
  useEffect(() => {

  })
  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      history.push('/')
    }
    else if (!localStorage.getItem('shipAddress')) {
      history.push('/shipping')
    }
    else if (!localStorage.getItem('paymethod')) {
      history.push('/payment')
    }
      const addPayPalScript = async () => {
        const {data:clientId} = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdk(true)
        }
        document.body.appendChild(script)
        console.log(clientId)
      }
      const getOrder = async () => {
        const {data} = await axios.get(`/api/order/${orderId}`)
        setOrder(data)
      }
      getOrder()
      if(order) {
        if(!order.isPaid)
          addPayPalScript()
      }
    return () => {
      abortControl.abort()
    }
  },[orderId])
  const payHandler = async (paymentResult) => {
    console.log(paymentResult)
    const { data } = await axios.put(`/api/order/${orderId}/pay`,paymentResult)
    history.push('/')
    localStorage.removeItem('cart')
    localStorage.removeItem('shipAddress')
    localStorage.removeItem('paymethod')
  }
  return (
    <div>
      {order && (
        <>
          <h2>Order {orderId}</h2>
          <h3>{console.log(order)}</h3>
          {order.shippingAddress && <h4>{order.shippingAddress.city}</h4>}
          <h6>Payment Method</h6>
          {order && <h6>{order.isPaid ? <span>Paid at {order.paidAt}</span> : <span>Not Paid</span>}</h6>}
          {!order.isPaid && <PayPalButton amount={order.totalPrice} onSuccess={payHandler}/>}
        </>
      )}
    </div>
  )
}

export default CompleteOrderScreen
