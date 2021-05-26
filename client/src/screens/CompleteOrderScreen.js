import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row,Col,Card,Alert,Button, Typography,message, Spin} from 'antd'
import {PayPalButton} from 'react-paypal-button-v2'
import {saveAs} from 'file-saver'
import {Link} from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
const {Paragraph} = Typography
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 50, marginBottom: 30 }} spin />;

const CompleteOrderScreen = ({history,match}) => {
  const orderId = match.params.id
  const [order,setOrder] = useState({})
  const [sdk,setSdk] = useState(false)
  const [user,setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [delivUpdate,setUpdate]=useState(false)
  const abortControl = new AbortController()

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      history.push('/')
      message.info("You must be logged in")
    }
        setUser(JSON.parse(localStorage.getItem('userInfo')))
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
      }
      const getOrder = async () => {
        const {data} = await axios.get(`/api/order/${orderId}`)
        setOrder(data)
        setLoading(false)
      }
      getOrder()
      if(order) {
        if(!order.isPaid){
          addPayPalScript()

        }
      }
    return () => {
      abortControl.abort()
    }
  },[orderId,delivUpdate])
  const payHandler = async (paymentResult) => {
    const { data } = await axios.put(`/api/order/${orderId}/pay`,paymentResult)
    history.push('/')
    await axios.post('/api/create-pdf',{user,orderData: JSON.parse(localStorage.getItem('orderData')),cartItems:JSON.parse(localStorage.getItem('cart')),paymentResult})
    .then(async() => await axios.get('/api/fetch-pdf',{responseType:'blob'}))
    .then((res) => {
      const pdfBlob = new Blob([res.data],{type:'application/pdf'});
      saveAs(pdfBlob,'invoice.pdf')
    })
    localStorage.removeItem('cart')
    localStorage.removeItem('orderData')
    localStorage.removeItem('shipAddress')
    localStorage.removeItem('paymethod')
    message.success("Payment done successfully")

  }

  const deliveryHandler = async () => {
    const {data} = await axios.put(`/api/order/${orderId}/delivered`,{})
    setUpdate(true)
  }

  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row justify="center">
        <Col style={{ marginTop: "60px",marginBottom:"60px" }} sm={24} xs={24} md={16} lg={16}>
          <Card style={{ textAlign: "center" }}>
            <h3 style={{ margin: "20px auto", color: "#096dd9" }}>Order Details</h3>
           {loading ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spin indicator={antIcon} />
              </div>
           ) : (
              <div style = {{ overflowX: "auto" }}>
              {order && (
              <>
                <table style={{ textAlign: "center", justifyContent: "center" }} className="table">
                  <tbody>
                    <tr>
                      <td>ORDER ID</td>
                      <td>{order._id}</td>
                    </tr>
                    <tr>
                      <td>Shipping Address</td>
                      <td>{order.shippingAddress && order.shippingAddress.address}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>{order.shippingAddress && order.shippingAddress.city + " (" + order.shippingAddress.postalCode + ")"}</td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>{order.shippingAddress && order.shippingAddress.country}</td>
                    </tr>
                  </tbody>
                </table>
                <h5 style={{ margin: "20px auto", color: "#096dd9" }}>Item Details</h5>
                <table className="table">
                  <thead>
                    <th>
                      BOOK
                      </th>
                    <th>
                      QUANTITY
                      </th>
                    <th>
                      TOTAL PRICE
                      </th>
                  </thead>
                  <tbody>
                    {order.orderItems && order.orderItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.name}
                        </td>
                        <td>
                          {item.count}
                        </td>
                        <td>
                          ${Number(item.price * item.count).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 style={{ margin: "20px auto", color: "#096dd9" }}>Payment Details</h5>
                <table style={{ textAlign: "center", justifyContent: "center" }} className="table">
                  <tbody>
                    <tr>
                      <td width="50%">
                        TOTAL PRICE
                        </td>
                      <td>
                        ${order.itemPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        SHIPPING CHARGES
                        </td>
                      <td>
                        ${order.shippingPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        TAX
                        </td>
                      <td>
                        ${order.taxPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        GRAND TOTAL
                        </td>
                      <td>
                        ${order.totalPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        PAYMENT METHOD
                        </td>
                      <td>
                        {order.paymentMethod}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        PAYMENT STATUS
                        </td>
                      <td style={{ padding: "5px" }}>
                        {order.isPaid ? <Alert type="success" message={`${order.paidAt.split("T")[0]}`} showIcon /> : <Alert type="warning" message="NOT PAID" showIcon />}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        DELIVERY STATUS
                        </td>
                      <td style={{ padding: "5px" }}>
                        {order.isDelivered ? <Alert type="success" message={`${order.deliveredAt.split("T")[0]}`} showIcon /> : <Alert type="warning" message="NOT DELIVERED" showIcon />}
                        {user.isAdmin && order.isPaid && !order.isDelivered && <Button onClick={deliveryHandler} style={{margin:"5px"}}>Mark as Delivered</Button>}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>This is a test payment mode. Always use sandbox paypal credential for payments. Never ever use real paypal credential. We will not be responsible for any financial loses.</p>
                {!order.isPaid && <PayPalButton amount={order.totalPrice} onError={() => message.error("Payment Unsuccessful")} onSuccess={payHandler} />}
              </>
            )}
            </div>
           )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CompleteOrderScreen
