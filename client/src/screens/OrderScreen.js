import React, { useEffect,useState } from 'react'
import {List,Row,Col, Button, Image, Select, message,Card} from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

const OrderScreen = ({history}) => {
  const [shippingAddress,setShippingAddress] = useState({})
  const [paymentMethod,setMethod] = useState('')
  const [orderItems,setOrderItems] = useState([])
  const [_id,setId] = useState('')
  const [username,setUsername] = useState('')
  const [address,setAddress] = useState('')
  const [city,setCity] = useState('')
  const [pin,setPin] = useState('')
  const [country,setCountry] = useState('')
  const [mobile,setMobile] = useState('')
  const [email,setEmail] = useState('')

  useEffect(() => {
    window.scrollTo(0,150)
  })

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push('/')
      message.info("You must be logged in")
    }
    else if(!localStorage.getItem('shipAddress')){
      history.push('/shipping')
      message.info("Address information needs to be filled")
    }
    else if(!localStorage.getItem('paymethod')){
      history.push('/shipping')
      message.info("Payment information needs to be filled")
    }
    else {
      const { address, mobile, city, country, postalCode } = JSON.parse(localStorage.getItem('shipAddress'))
      setAddress(address)
      setMobile(mobile)
      setCity(city)
      setCountry(country)
      setPin(postalCode)
      setShippingAddress(JSON.parse(localStorage.getItem('shipAddress')))
      const {paymethod} = JSON.parse(localStorage.getItem('paymethod'))
      setMethod(paymethod)
      setOrderItems(JSON.parse(localStorage.getItem('cart')))
      const {name,email} = JSON.parse(localStorage.getItem('userInfo'))
      setUsername(name)
      setEmail(email)
      const {_id} = JSON.parse(localStorage.getItem('userInfo'))
      setId(_id)
    }
  },[history])

  const placeOrder = async () => {
    try {
      const {email} = JSON.parse(localStorage.getItem('userInfo'))
      const {data} = await axios.post('/api/users/profile',{email})
      if(data) {
        const { data } = await axios.post(`/api/order`, {
          orderItems,
          shippingAddress,
          paymentMethod,
          itemPrice: Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)).toFixed(2),
          shippingPrice: Number((orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 15)),
          taxPrice: Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))).toFixed(2),
          totalPrice: Number(Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)) + Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))) + Number((orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20))).toFixed(2),
          _id
        })
        localStorage.setItem('orderData', JSON.stringify(data))
        message.success("Order placed successfully")
        history.push(`/placeorder/${data._id}`)
        localStorage.removeItem('shipAddress')
        localStorage.removeItem('paymethod')
      }
    } catch (error) {
      message.error("Order not placed successfully! Refresh the page")
    }

  }


  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row justify="center">

        <Col style={{ marginTop: "60px", minHeight:"130vh" }} sm={20} xs={24} md={12} lg={12}>
          <Card style={{ paddingBottom:"30px", textAlign: "center" }}>

                <h3 style={{ margin: "20px auto", color: "#096dd9" }}>Order</h3>
                <table className="table">
                  <tbody>
                <tr>
                  <td>
                    Customer
                      </td>
                  <td>
                    {username}
                  </td>
                </tr>
                <tr>
                  <td>
                    Mobile Number
                      </td>
                  <td>
                    {mobile}
                  </td>
                </tr>
                <tr>
                  <td>
                    Item Price
                      </td>
                  <td>
                    ${Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>
                    Shipping Charges
                      </td>
                  <td>
                    ${(orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20)}
                  </td>
                </tr>
                <tr>
                  <td>
                    Tax
                      </td>
                  <td>
                    ${Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>
                    Total Price
                      </td>
                  <td>
                    ${Number(Number(orderItems.reduce((acc, item) => acc + item.price * item.count, 0)) + Number(0.07 * (orderItems.reduce((acc, item) => acc + item.price * item.count, 0))) + Number((orderItems.reduce((acc, item) => acc + item.price * item.count, 0) > 100 ? 0 : 20))).toFixed(2)}
                  </td>
                </tr>
                    <tr>
                      <td>
                        Address
                      </td>
                      <td>
                        {address}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        City
                      </td>
                      <td>
                        {city + " (" + pin + ")"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Country
                          </td>
                      <td>
                        {country}
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
                <Button id="go-to-payment-btn" autoFocus onClick={placeOrder} >Proceed to Checkout</Button>

          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
