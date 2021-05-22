import { Row,Card,Col,Form,Input,Button,message,Select } from 'antd'
import React, { useEffect, useState } from 'react'
import {HomeOutlined,MobileOutlined,GlobalOutlined,EnvironmentOutlined,BorderlessTableOutlined} from '@ant-design/icons'

const ShippingScreen = ({history}) => {
  const [addressLine1,setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country,setCountry] = useState('')
  const [mobile,setMobile] = useState(0)
  const [paymethod,setPaymethod] = useState('PayPal')

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push('/')
      message.info("You must be logged in")
    }
    if(localStorage.getItem('shipAddress')){
      if(localStorage.getItem('paymethod')){
        history.push("/placeorder")
        message.info("You have already filled the address information")
      }
    }

  },[history])

  const submitHandler = () => {
    let address
    if(addressLine2 !== ''){
      address = addressLine1 + ", " + addressLine2
    }
    else {
      address = addressLine1
    }
    localStorage.setItem('shipAddress', JSON.stringify({address,city,mobile,postalCode,country}))
    localStorage.setItem('paymethod', JSON.stringify({ paymethod }))
    history.push('/placeorder')
    message.success("Information stored successfully")
  }


  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row justify="center">

        <Col style={{ marginTop: "60px" }} sm={20} xs={24} md={12} lg={12}>
          <Card style={{ padding: "20px", textAlign: "center" }}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={submitHandler}
            >
              <Form.Item
                name="addressline1"
                rules={[
                  {
                    required: true,
                    message: 'Please enter address',
                  },
                ]}
              >
                <Input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} prefix={<EnvironmentOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="ADDRESS LINE 1" />
              </Form.Item>
              <Form.Item
                name="addressline2"
              >
                <Input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} prefix={<EnvironmentOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="ADDRESS LINE 2" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please enter valid mobile number',
                  },
                ]}
              >
                <Input value={mobile} onChange={(e) => setMobile(e.target.value)} prefix={<MobileOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="MOBILE NUMBER" />
              </Form.Item>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please enter city',
                  },
                ]}
              >
              <Input value={city} onChange={(e) => setCity(e.target.value)} prefix={<HomeOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="CITY" />

              </Form.Item>
              <Form.Item
                name="postalCode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter valid postal code',
                  },
                ]}
              >
                <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} prefix={<BorderlessTableOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="POSTAL/PIN CODE" />

              </Form.Item>
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: 'Please enter country',
                  },
                ]}
              >
                <Input value={country} onChange={(e) => setCountry(e.target.value)} prefix={<GlobalOutlined style={{ marginRight: "20px" }} className="site-form-item-icon" />} placeholder="COUNTRY" />

              </Form.Item>
              <Form.Item
                name="paymethod"
                label="Payment Method"
                rules={[
                  {
                    required: true,
                    message: 'Please enter payment method',
                  },
                ]}
              >
                <Select  placeholder="PAYMENT METHOD" value={paymethod} onChange={(value) => setPaymethod(value)} >
                  {
                      <Select.Option value={`PayPal`}>PayPal</Select.Option>
                  }
                </Select>

              </Form.Item>
              <Form.Item>
                <Button id="placeorder-btn" type="primary" htmlType="submit" className="login-form-button">
                  Proceed to Order Confirmation
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ShippingScreen
