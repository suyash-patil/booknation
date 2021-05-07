import React, { useEffect,useState } from 'react'
import {List,Row,Col, Button, Image, Select} from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

const OrderScreen = ({history}) => {
  const [shippingAddress,setAddress] = useState({})
  const [paymentMethod,setMethod] = useState('')
  const [orderItems,setOrderItems] = useState([])
  const [_id,setId] = useState('')

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push('/')
    }
    else if(!localStorage.getItem('shipAddress')){
      history.push('/shipping')
    }
    else if(!localStorage.getItem('paymethod')){
      history.push('/payment')
    }
    else {
      setAddress(JSON.parse(localStorage.getItem('shipAddress')))
      const {paymethod} = JSON.parse(localStorage.getItem('paymethod'))
      setMethod(paymethod)
      setOrderItems(JSON.parse(localStorage.getItem('cart')))
      const {_id} = JSON.parse(localStorage.getItem('userInfo'))
      console.log(_id)
      setId(_id)
    }
  },[history])

  const placeOrder = async () => {
    const { data } = await axios.post(`/api/order`, { orderItems, shippingAddress, paymentMethod, itemPrice: Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)), shippingPrice: Number((orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20)), taxPrice: Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))).toFixed(2), totalPrice: Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)) + Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))) + Number((orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20)),_id})
    console.log('success',data)
    history.push(`/placeorder/${data._id}`)
  }


  return (
    <div>
      <h2>Shipping Address</h2>
      <h5>{shippingAddress.address}</h5>
      <h2>Payment Method</h2>
      <h5>{paymentMethod}</h5>
      <h2>Cart</h2>
      {orderItems && <List>
        {console.log(orderItems)}
        {orderItems.map((item) => (
          <List.Item>
            <Row>
              <Col>
                <Image width="40px" height="64px" src={item.image} />
              </Col>
              <Col>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </Col>
              <Col>
                {item.count} x ${item.price} = ${item.count * item.price}
              </Col>
              <Col>
                {/* <Form >
                <Form.Item label="Qty">
                  <Select value={item.count} onChange={(value) => changeCartItem(item, value)} >
                    {
                      [...Array(item.countInStock).keys()].map(x => (
                        <Select.Option value={x + 1}>{x + 1}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </Form> */}
              </Col>
              {/* <Col>
              <Button onClick={() => removeItemFromCart(item)}>
                <DeleteOutlined />
              </Button>
            </Col> */}

            </Row>
          </List.Item>
        ))}
      </List>}
      <Col>
        <h3>Price: ${orderItems.reduce((acc, item) => acc + item.price * item.count, 0)}</h3>
      </Col>
      <Col>
        <h3>Shipping Charge: ${(orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20)}</h3>
      </Col>
      <Col>
        <h3>Tax: ${Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))).toFixed(2)}</h3>
      </Col>
      <Col>
        <h3>Total : ${Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)) + Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))) + Number((orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20))}</h3>
      </Col>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  )
}

export default OrderScreen
