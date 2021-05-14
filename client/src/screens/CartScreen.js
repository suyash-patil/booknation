import { Button, Col, Row, List,Image,Form,Select, Typography,Card, message,Popconfirm } from 'antd'
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {addItem, removeItem} from '../helpers/cartHelper'
import {DeleteOutlined} from '@ant-design/icons'
const {Title} = Typography

const CartScreen = ({history,cartItems,setCartItems}) => {

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart')))

  },[window.localStorage.getItem('cart')])

  useEffect(() => {
    if(!localStorage.getItem('cart')){
      history.push("/")
      message.info("Cart is empty")
    }
    if(localStorage.getItem('cart')){
      if(!JSON.parse(localStorage.getItem('cart')).length){
        history.push("/")
        message.info("Cart is empty")
      }
    }
  }, [window.localStorage.getItem('cart')])

  const changeCartItem = (item,value) => {
    addItem(item,value);
    setCartItems(JSON.parse(localStorage.getItem('cart')))
    message.success(`Changed "${item.name}" quantity to ${value} `)
  }
  const removeItemFromCart = (item) => {
    removeItem(item)
    setCartItems(JSON.parse(localStorage.getItem('cart')))
    message.success("Item removed from cart")
  }


  return (
    <>
      <Row style={{marginTop:"25px"}} gutter={[32,32]}>
        <Col xs={24} sm={24} md={14}>
      <Card>
          <Typography style={{borderBottom:"1px solid #d1d1d1"}}>
            <Title style={{fontSize:"1.5rem" }}>Shopping Cart</Title>
          </Typography>
        {cartItems && cartItems.length === 0 ? <h6>Empty</h6> : (
          <List >
            {cartItems && cartItems.map(item => (
              <List.Item id="cart-list-item">
                <Row id="cart-items-row" >
                      <Image style={{ objectFit: "contain", maxWidth: "150px" }} height="150px" src={item.image} />
                    <Col style={{textAlign:"justify"}}>
                      <Row id="cart-items-row-book-name" >
                        <Link style={{fontSize:"1.1rem",color:"black"}} to={`/product/${item._id}`}>{item.name}</Link>
                      </Row>
                    <Row id="cart-items-row-book-price" style={{marginTop:"10px"}}>
                        <Typography>
                          <Title style={{color:"grey",fontSize:"0.9rem"}}>Price: ${item.price}</Title>
                        <Title style={{ color: "grey", fontSize: "0.9rem" }}>Author: {item.author}</Title>
                        </Typography>
                      </Row>
                    <Row id="cart-items-row-book-edit" style={{marginTop:"10px"}}>
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
                        <Popconfirm placement="right" title="Are you sure you want to remove item from cart" okText="Yes" cancelText="Cancel" onConfirm={() => removeItemFromCart(item)}>
                          <Button style={{ marginLeft: "5px", background: "#ff2925", color: "white", border: "#ff2925" }}>
                            <DeleteOutlined />
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                </Col>
                </Row>
              </List.Item>
            ))}
          </List>
        )}
          </Card>
      </Col>

      <Col xs={24} sm={24}  md={10}>
        <Card id="price-card">
            <Typography style={{ textAlign:"center" }}>
              <Title style={{ fontSize: "1.5rem" }}>Subtotal</Title>
            </Typography>
              <List>
                <table style={{ textAlign:"center", fontSize: "1rem", fontWeight: "400" }}       className="table">
                    <tbody>
                  <tr>
                    <td>Total Items:</td>
                    <td>{cartItems && cartItems.reduce((acc, item) => acc + item.count, 0)}</td>
                  </tr>
                  <tr>
                    <td>Total Price:</td>
                    <td>${Number(cartItems && cartItems.reduce((acc, item) => acc + item.count * item.price, 0)).toFixed(2)}</td>
                  </tr>
                    </tbody>
                  </table>
                  <List.Item>
                <Button id="checkout-btn">
                  <Link to="/shipping">Place Order</Link>
                    </Button>
                  </List.Item>
              </List>
          </Card>
      </Col>
    </Row>
    </>


  )
}

export default CartScreen
