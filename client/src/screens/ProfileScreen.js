import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Card,Row,Col,Typography,Input, Button, message,Alert,Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
const {Paragraph} = Typography
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 50, marginBottom: 20 }} spin />;

const ProfileScreen = ({history,profileUpdated,setProfileUpdated}) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [edit,setEdit] = useState(false)
  const [create,setCreate] = useState('')
  const [update, setUpdate] = useState('')
  const [user,setUser] = useState(null)
  const [oldpassword,setOldPassword] = useState('')
  const [newpass,setNewPass]= useState('')
  const [isUpdated,setIsUpdated] = useState(false)
  const [passUpdated,setPassUpdated] = useState(false)
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  const passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}$/;

  useEffect(() => {
    setEdit(false)

  },[passUpdated])

  const updateHandler = async () => {
    if(name === ""){
      message.info("Name cannot be empty")
    }
    else if(newpass || oldpassword) {
     if (newpass.length < 6) {
      message.info("Password must be 6 characters long")
    }
    else if (!newpass.match(passw)) {
      message.info("Password must contain at least one numeric digit and a special character")
    }
    else if (newpass === oldpassword) {
      message.info("Current password and new password are same")
    }
    }
    else {
      const { token } = JSON.parse(localStorage.getItem('userInfo'))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try{
        const { data } = await axios.put(`/api/users/profile/update`, { email, name, oldpassword, newpass }, config)
        localStorage.setItem('userInfo', JSON.stringify(data))
        message.success("Profile Updated!")
        setNewPass("")
        setOldPassword("")
        setPassUpdated(true)
        setProfileUpdated(true)
        history.push("/profile")
      } catch(error){
        message.error('The password you entered doesn\'t match the records')
      }
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      history.push('/')
      message.info("You must be logged in to view profile")
      return
    }
    else {
      const { email, name, token, createdAt, updatedAt } = JSON.parse(localStorage.getItem('userInfo'))
      setUser(JSON.parse(localStorage.getItem('userInfo')))
      setName(name)
      setEmail(email)
      setCreate(createdAt)
      setUpdate(updatedAt)
    }

  }, [history])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { _id } = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.get(`/api/order/getorders/${_id}`)
        setLoading(false)
        setOrders(data)
      } catch (error) {

      }
    }
    fetchOrders()
  },[])



  return (
      <div style={{ marginTop:"0px", backgroundColor: "#002766", maxHeight:"120px" }}>
      <Row gutter={[12,12]} justify="center" >

        <Col style={{marginTop:"60px"}} sm={24} xs={24} md={24} lg={12}>
         <Card style={{textAlign:"center"}}>
              {edit ? (
                <>
                <form style={{ marginLeft: "0", marginTop: "20px" }}
                >
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        Name
                      </td>
                      <td>
                          <Input value={name} required={true} onChange={(e) => { setName(e.target.value); setIsUpdated(true) }} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Email
                      </td>
                      <td>
                        <Input value={email} disabled />
                      </td>
                    </tr>
                    <tr>
                      <td>
                      Current Password
                      </td>
                      <td>
                          <Input.Password onChange={(e) => { setOldPassword(e.target.value); setIsUpdated(true) }} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        New Password
                      </td>
                      <td>
                          <Input.Password onChange={(e) => { setNewPass(e.target.value); setIsUpdated(true) }} />
                      </td>
                    </tr>

                  </tbody>
                </table>
                  <div style={{margin:"20px"}}><span style={{color:"red"}}>*</span> If you don't want to update password, leave it empty</div>
                  <Button style={{ color: "white", backgroundColor: "#096dd9", border: "1px solid #096dd9" }} type="primary" disabled={!isUpdated} onClick={updateHandler}>Update Profile</Button>
                </form>
              </>
          ) : (
           <>
                <h3 style={{ margin: "20px auto", color: "#096dd9" }}>{name}</h3>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        Email
                      </td>
                      <td>
                        {email}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Profile Created
                      </td>
                      <td>
                        {create.split("T")[0]}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Profile Updated
                      </td>
                      <td>
                        {update.split("T")[0]}
                      </td>
                    </tr>
                  </tbody>
                </table>
                  <Button style={{ color:"white", backgroundColor: "#096dd9", border:"1px solid #096dd9"}} type="primary" onClick={() => setEdit(true)}>Edit Profile</Button>
              </>
           )}
        </Card>
      </Col>
        <Col style={{ marginTop: "60px" }} sm={24} xs={24} md={20} lg={20}>
          <Card style={{ textAlign: "center", marginBottom:"50px" }}>
            <h3 style={{ margin: "20px auto", color: "#096dd9" }}>Orders</h3>
            {loading ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Spin indicator={antIcon} />
            </div>) : (<>
            {orders.length === 0 && <p>You have no orders to display</p> }
            {orders.length && <div style={{overflowX:"auto"}}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          ID
                    </th>
                        <th>
                          DATE
                    </th>
                        <th>
                          TOTAL
                    </th>
                        <th>
                          PAYMENT
                    </th>
                        <th>
                          DELIVERY
                    </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr style={{ alignItems: "center" }} key={order._id}>
                          <td>
                            <Paragraph copyable={{ onCopy: function () { message.success("Copied to Clipboard") } }}>{order._id}</Paragraph>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {order.createdAt.split("T")[0]}
                          </td>
                          <td>
                            {order.totalPrice}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {order.isPaid ? <Alert style={{ padding: "4px" }} message={order.paidAt.split("T")[0]} type="success" showIcon /> : <Alert style={{ padding: "4px" }} message="Pending" type="warning" showIcon />}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {order.isDelivered ? <Alert style={{ padding: "4px" }} message={order.deliveredAt.split("T")[0]} type="success" showIcon /> : <Alert style={{ padding: "4px" }} message="Pending" type="warning" showIcon />}
                          </td>
                          <td>
                            <Link to={`placeorder/${order._id}`}>
                              <Button>
                                Details
                          </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

            </div>}
            </>)}
          </Card>
        </Col>
    </Row>
      </div>
  )
}

export default ProfileScreen
