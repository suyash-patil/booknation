import React, { useState,useEffect } from 'react'
import { Menu } from 'antd'
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu';
const { Item } = Menu;

const Header = ({setUser,user}) => {
  const history = useHistory()

  const [current, setCurrent] = useState('home')

  const logout = () => {
    window.localStorage.removeItem('userInfo');
    history.push('/')
    setUser(null);
  }
  const giveData = () => {
    console.log('user', user)
  }

  useEffect(() => {
    const setHeader = () => {
      setUser(JSON.parse(window.localStorage.getItem('userInfo')))
    }
    return () => setHeader
  },[setUser])

  return (
    <Menu selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Covercove</Link>
      </Item>

      {user ? (<SubMenu icon={<UserOutlined />} className="float-right" title={user.name} >
          <Menu.Item onClick={giveData}>
            <Link to="/profile">
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item onClick={logout}>
            Logout
          </Menu.Item>
      </SubMenu>) : (
        <Item key = "signin" icon = { <UserOutlined />} className="float-right">
      <Link to="/login">Login</Link>
      </Item>
      )}

      {user ? <Item key="cart" icon={<ShoppingCartOutlined />} className="float-right">
        <Link to="/cart">Cart</Link>
      </Item> : <Item key="register" className="float-right">
        <Link to="/register">
          Register
        </Link>
      </Item>}
    </Menu>
  )
}

export default Header
