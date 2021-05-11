import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {Form, Button,Row,Col,Card,Input,message} from 'antd'
import {MailOutlined,LockOutlined, UserOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const RegisterScreen = ({history,setUser,user}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}$/;

  useEffect(() => {
    if(localStorage.getItem('userInfo')){
      history.push("/")
      message.info("You have already registered")
    }
  },[])

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const registerHandler = async () => {

    if(password.length < 6) {
      message.info("Password must be 6 characters long")
    }
    else if (!password.match(passw)) {
      message.info("Password must contain at least one numeric digit and a special character")
    }
    else {
      try {
        const { data } = await axios.post(`/api/users/register`, { name, email, password }, config)
        if (data) {
          localStorage.setItem('userInfo', JSON.stringify(data))
          setUser(JSON.parse(localStorage.getItem('userInfo')))
          history.push("/")
          message.success("Registration Successful")
        }
      } catch (error) {
        message.error("User already exists with given email address")
      }
    }
  }

  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row justify="center">

        <Col style={{ marginTop: "60px" }} sm={20} xs={24} md={12} lg={12}>
          <Card style={{ padding: "20px", textAlign: "center" }}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={registerHandler}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input value={name} onChange={(e) => setName(e.target.value)} prefix={<UserOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input value={email} onChange={(e) => setEmail(e.target.value)} prefix={<MailOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  prefix={<LockOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />}
                  type="password"
                  placeholder="Enter Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>

              </Form.Item>
              <Form.Item>
                Already a member <Link to="/login">Login Now</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterScreen
