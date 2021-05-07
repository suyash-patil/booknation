import { Button, Col, Row, List,Image,Form,Select } from 'antd'
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {addItem, removeItem} from '../helpers/cartHelper'
import {DeleteOutlined} from '@ant-design/icons'
const {Item} = List

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
    <Row>
      <Col>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <h6>Empty</h6> : (
          <List>
            {cartItems.map(item => (
              <List.Item>
                <Row>
                  <Col>
                    <Image width="40px" height="64px" src={item.image}/>
                  </Col>
                  <Col>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col>
                    ${item.price}
                  </Col>
                  <Col>
                    <Form >
                      <Form.Item label="Qty">
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
                  </Col>
                </Row>
              </List.Item>
            ))}
          </List>
        )}
      </Col>
      <Col>
        <List>
          <List.Item>
            <h2>Subtotal ({cartItems.reduce((acc,item)=> acc+item.count, 0)})</h2>
            ${cartItems.reduce((acc,item)=> acc+item.count * item.price, 0)}
          </List.Item>
        </List>
      </Col>
    </Row>
  )
}

export default CartScreen
