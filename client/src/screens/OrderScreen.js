import React, { useEffect,useState } from 'react'
import {List,Row,Col, Button, Image, Select} from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

const OrderScreen = ({history}) => {
  const [shippingAddress,setAddress] = useState({})
  const [paymentMethod,setMethod] = useState('')
  const [cart,setCart] = useState([])
  const [_id,setId] = useState()
  const [itemPrice,setItemPrice] = useState(50)
  const [shippingPrice, setShippingPrice] = useState(10)
  const [taxPrice,setTaxPrice]  = useState(3.4)
  const [totalPrice,setTotalPrice] = useState(63.4)

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
      setCart(JSON.parse(localStorage.getItem('cart')))
      const {_id} = JSON.parse(localStorage.getItem('userInfo'))
      setId(_id)
    }
  },[history])

  const placeOrder = async () => {
    const {data} = await axios.post(`/api/order`,{cart,shippingAddress,paymentMethod, itemPrice,shippingPrice,taxPrice,totalPrice,_id})
    console.log('success',data)
  }


  return (
    <div>
      <h2>Shipping Address</h2>
      <h5>{shippingAddress.address}</h5>
      <h2>Payment Method</h2>
      <h5>{paymentMethod}</h5>
      <h2>Cart</h2>
      {cart && <List>
        {console.log(cart)}
        {cart.map((item) => (
          <List.Item>
            <Row>
              <Col>
                <Image width="40px" height="64px" src={item.image} />
              </Col>
              <Col>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </Col>
              <Col>
                ${item.price}
              </Col>
              <Col>
                <span>{item.count}</span>
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
      <button onClick={placeOrder}>Place Order</button>
    </div>
  )
}

export default OrderScreen
