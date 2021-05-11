import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Form, Input, Button, Checkbox,message,Row,Col,Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

const LoginScreen = ({history,setUser,user}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      history.push("/")
      message.info("You are already logged in")
    }
  },[])

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const loginHandler = async (e) => {
    try {
      const { data } = await axios.post(`/api/users/login`, { email, password }, config);

      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
        setUser(JSON.parse(localStorage.getItem('userInfo')))
        history.push('/')
        message.success("Logged In Successfully")
      }
    }
    catch(error) {
      message.error("Wrong email address or password")
    }
  }

  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row justify="center">

        <Col style={{ marginTop: "60px" }} sm={20} xs={24} md={12} lg={12}>
          <Card style={{ padding:"20px", textAlign: "center" }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={loginHandler}
            >
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
                <Input value={email} onChange={(e) => setEmail(e.target.value)} prefix={<MailOutlined style={{marginRight:"20px"}} className="site-form-item-icon" />} placeholder="Email Address" />
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
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>

              </Form.Item>
              <Form.Item>
                Not a member <Link to="/register">Sign Up Now</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginScreen
