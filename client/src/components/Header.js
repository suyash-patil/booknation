import React, { useState } from 'react'
import {Menu} from 'antd'
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
const { SubMenu, Item } = Menu;
const Header = () => {

  const [current, setCurrent] = useState('home')

  return (
    <Menu selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        Home
      </Item>

      <Item key="signin" icon={<UserAddOutlined />} className="float-right">
        Sign In
      </Item>

      <Item key="cart" icon={<UserOutlined />} className="float-right">
        Cart
      </Item>
    </Menu>
  )
}

export default Header
