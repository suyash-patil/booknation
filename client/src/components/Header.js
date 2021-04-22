import React, { useState } from 'react'
import { Menu } from 'antd'
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
const { Item } = Menu;

const Header = () => {

  const [current, setCurrent] = useState('home')

  return (
    <Menu selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        Home
      </Item>

      <Item key="signin" icon={<UserOutlined />} className="float-right">
        Sign In
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />} className="float-right">
        Cart
      </Item>
    </Menu>
  )
}

export default Header
