import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Card,Row,Col,Form,Typography,Descriptions,Input, Button, message} from 'antd'
import { MailOutlined} from '@ant-design/icons'

const ProfileScreen = ({history}) => {
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
        message.success("Profile Updated! Please refresh the page")
        setNewPass("")
        setOldPassword("")
        setPassUpdated(true)
        history.push("/profile")
      } catch(error){
        message.error('The password you entered doesn\'t match the records')
      }
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('userInfo')){
      history.push('/')
    }
    else {
      const { email,name, token,createdAt,updatedAt } = JSON.parse(localStorage.getItem('userInfo'))
      setUser(JSON.parse(localStorage.getItem('userInfo')))
      setName(name)
      setEmail(email)
      setCreate(createdAt)
      setUpdate(updatedAt)
    }

  },[history])
  return (
      <div style={{ marginTop:"0px", backgroundColor: "#002766", maxHeight:"120px" }}>
      <Row justify="center">

        <Col style={{marginTop:"60px"}} sm={20} xs={24} md={12} lg={12}>
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
    </Row>
      </div>
  )
}

export default ProfileScreen
