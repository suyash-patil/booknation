import React, { useState,useEffect } from 'react'
import { Menu,message,Badge } from 'antd'
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';
const { Item } = Menu;

const Header = ({setUser,user,setProfileUpdated,profileUpdated}) => {
  const history = useHistory()

  const [current, setCurrent] = useState('home')
  const [cartItems,setCartItems] = useState([])

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart')))

  },[window.localStorage.getItem('cart')])

  const logout = () => {
    window.localStorage.removeItem('userInfo');
    history.push('/')
    setUser(null);
    message.success("Logged Out Successfully")
  }
  const giveData = () => {
    console.log('user', user)
  }

  useEffect(() => {
    const fetchProfile = async() => {
      try {
        const {email} = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.post('/api/users/profile', { email },config)
        setUser(data)
        setProfileUpdated(false)
      } catch (error) {
        message.error("Profile not found! This can happen if admin deleted your profile")
        setUser(null)
        history.push("/")
        localStorage.removeItem('userInfo')
      }
    }
    fetchProfile()
  },[profileUpdated,history])

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

      {user ? <Item key="cart" icon={<Badge offset={[-8, -2]} size="small" count={cartItems ? cartItems.length : 0}><ShoppingCartOutlined/></Badge>} className="float-right">
        <Link to="/cart">Cart</Link>
      </Item> : <Item key="register" className="float-right">
        <Link to="/register">
          Register
        </Link>
      </Item>}
      {user && user.isAdmin && <Item key="userlist" className="float-right">
        <Link to="/userlist">
          Users
        </Link>
      </Item>}
    </Menu>
  )
}

export default Header
