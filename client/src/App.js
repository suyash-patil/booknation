import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen'
import CompleteOrderScreen from './screens/CompleteOrderScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentScreen from './screens/PaymentScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'

const App = () => {
  const [cartItems,setCartItems] = useState([]);
  const [user,setUser] = useState(null);

  useEffect(() => {
    if(typeof window!== 'undefined'){
      if(localStorage.getItem('cart')){
        setCartItems(JSON.parse(localStorage.getItem('cart')))
      }
      if(localStorage.getItem('userInfo')){
        setUser(JSON.parse(localStorage.getItem('userInfo')))
      }
    }


  },[])


  return (
    <>
      <Header setUser={setUser} user={user}/>
      <main>
        <Switch>
          <Route exact path="/register" render={(props) => (<RegisterScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route exact path="/profile" render={(props) => (<ProfileScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route exact path="/login" render={(props) => (<LoginScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user}  />)}/>
          <Route exact path="/" render={(props) => (<HomeScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)}/>
          <Route path="/product/:id" render={(props) => (<ProductScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route path="/cart/:id?" render={(props) => (<CartScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route exact path="/shipping" render={(props) => (<ShippingScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route exact path="/payment" render={(props) => (<PaymentScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route exact path="/placeorder" render={(props) => (<OrderScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
          <Route exact path="/placeorder/:id" render={(props) => (<CompleteOrderScreen {...props} setCartItems={setCartItems} cartItems={cartItems} setUser={setUser} user={user} />)} />
        </Switch>
      </main>
      <Footer/>
    </>
  )
}

export default App

