import React, { useState,useEffect } from 'react'
import { Menu,message,Badge } from 'antd'
import { HomeOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
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

  useEffect(() => {
    const fetchProfile = async() => {
      try {
        const {email} = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.post('/api/users/profile', { email },config)
        setUser(data)
        setProfileUpdated(false)
      } catch (error) {
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
          <Menu.Item>
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

      {user && user.isAdmin && <SubMenu icon={<SettingOutlined />} className="float-right" title="Admin" >
        <Menu.Item>
          <Link to="/admin/userlist">
            Users
            </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/productlist">
            Products
          </Link>
          </Menu.Item>
        <Menu.Item>
          <Link to="/admin/orderlist">
            Orders
          </Link>
        </Menu.Item>
      </SubMenu>}
    </Menu>
  )
}

export default Header
