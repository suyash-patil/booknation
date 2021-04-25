import React, { useState } from 'react'
import { Menu } from 'antd'
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
const { Item } = Menu;

const Header = () => {

  const [current, setCurrent] = useState('home')

  return (
    <Menu selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="signin" icon={<UserOutlined />} className="float-right">
        <Link to="/signin">Sign In</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />} className="float-right">
        <Link to="/cart">Cart</Link>
      </Item>
    </Menu>
  )
}

export default Header
