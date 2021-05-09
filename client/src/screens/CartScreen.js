import { Button, Col, Row, List,Image,Form,Select, Typography,Card } from 'antd'
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {addItem, removeItem} from '../helpers/cartHelper'
import {DeleteOutlined} from '@ant-design/icons'
import Paragraph from 'antd/lib/skeleton/Paragraph'
const {Item} = List
const {Title} = Typography

const CartScreen = ({cartItems,setCartItems}) => {

  const changeCartItem = (item,value) => {
    addItem(item,value);
    setCartItems(JSON.parse(localStorage.getItem('cart')))
  }
  const removeItemFromCart = (item) => {
    removeItem(item)
    setCartItems(JSON.parse(localStorage.getItem('cart')))
  }

  return (
    <>
      <Row style={{marginTop:"25px"}} gutter={[32,32]}>
      <Col md={14}>
      <Card>
          <Typography style={{borderBottom:"1px solid #d1d1d1"}}>
            <Title style={{fontSize:"1.5rem" }}>Shopping Cart</Title>
          </Typography>
        {cartItems.length === 0 ? <h6>Empty</h6> : (
          <List >
            {cartItems.map(item => (
              <List.Item id="cart-list-item">
                <Row >
                      <Image style={{ objectFit: "contain", maxWidth: "150px" }} height="150px" src={item.image} />
                    <Col style={{textAlign:"justify"}}>
                      <Row >
                        <Link style={{fontSize:"1.1rem",color:"black"}} to={`/product/${item._id}`}>{item.name}</Link>
                      </Row>
                      <Row style={{marginTop:"10px"}}>
                        <Typography>
                          <Title style={{color:"grey",fontSize:"0.9rem"}}>Price: ${item.price}</Title>
                        <Title style={{ color: "grey", fontSize: "0.9rem" }}>Author: {item.author}</Title>
                        </Typography>
                      </Row>
                    <Row>
                      <Col style={{ textAlign: "justify" }}>
                        <Form className="cart-form">
                          <Form.Item label="Quantity">
                            <Select className="cart-form-select" value={item.count} onChange={(value) => changeCartItem(item, value)} >
                              {
                                [...Array(item.countInStock).keys()].map(x => (
                                  <Select.Option value={x + 1}>{x + 1}</Select.Option>
                                ))
                              }
                            </Select>
                          </Form.Item>
                        </Form>
                      </Col>
                      <Col>
                        <Button onClick={() => removeItemFromCart(item)}>
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                    {/* <Col>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col>
                    ${item.price}
                  </Col>
                  <Col>
                    <Form >
                      <Form.Item label="Quantity">
                        <Select value={item.count} onChange={(value) => changeCartItem(item,value)} >
                          {
                            [...Array(item.countInStock).keys()].map(x => (
                              <Select.Option value={x + 1}>{x + 1}</Select.Option>
                            ))
                          }
                        </Select>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    <Button onClick={() => removeItemFromCart(item)}>
                      <DeleteOutlined />
                    </Button>
                  </Col> */}
                </Col>
                </Row>
              </List.Item>
            ))}
          </List>
        )}
          </Card>
      </Col>

      <Col md={10}>
        <Card>
        <List>
          <List.Item>
            <h2>Subtotal ({cartItems.reduce((acc,item)=> acc+item.count, 0)})</h2>
            ${cartItems.reduce((acc,item)=> acc+item.count * item.price, 0)}
          </List.Item>
        </List>
          </Card>
      </Col>
    </Row>
    </>


  )
}

export default CartScreen
