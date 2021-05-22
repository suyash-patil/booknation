import React,{useState,useEffect} from 'react'
import {Row,Col,message,Form,Card,Spin,Button,Alert} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import axios from 'axios';
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 50, marginBottom: 50 }} spin />;

const OrderlistScreen = ({history}) => {

  const [loading,setLoading] = useState(true)
  const [orders,setOrders] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      history.push("/")
      message.error("You must be logged in")
    }
    if (localStorage.getItem('userInfo')) {
      const { isAdmin } = JSON.parse(localStorage.getItem('userInfo'))
      if (!isAdmin) {
        history.push('/')

        message.info("You must be an Admin")
      }
    }
  }, [history])

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.post('/api/order/getallorders')
      setOrders(data)
      setLoading(false)
    }
    fetchOrders()
  }, [])

  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row gutter={[12, 12]} justify="space-around" >

        <Col style={{ marginTop: "60px" }} sm={24} xs={24} md={24} lg={24}>
          <Card style={{ textAlign: "center" }}>
            <h1>Orders</h1>
            {loading ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Spin indicator={antIcon} />
            </div>) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ textAlign: "center" }} className="table">
                  <thead>
                    <th>
                      ID
                    </th>
                    <th>
                      USER
                    </th>
                    <th>
                      DATE
                    </th>
                    <th>
                      PRICE
                    </th>
                    <th>
                      PAID
                    </th>
                    <th>
                      DELIVERED
                    </th>
                    <th>

                    </th>
                  </thead>
                  <tbody>
                    {orders && orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name ? `${order.user.name}` : `User not exist`}</td>
                        <td>{order.createdAt.split("T")[0]}</td>
                        <td>${order.totalPrice}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {order.isPaid ? <Alert style={{ padding: "4px" }} message={order.paidAt.split("T")[0]} type="success" showIcon /> : <Alert style={{ padding: "4px" }} message="Pending" type="warning" showIcon />}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {order.isDelivered ? <Alert style={{ padding: "4px" }} message={order.deliveredAt.split("T")[0]} type="success" showIcon /> : <Alert style={{ padding: "4px" }} message="Pending" type="warning" showIcon />}
                        </td>
                        <td>
                          <Link to={`/placeorder/${order._id}`}>
                            <Button>
                              Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            )}

          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderlistScreen
