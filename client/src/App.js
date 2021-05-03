import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  const [cartItems,setCartItems] = useState([])

  useEffect(() => {
    if(typeof window!== 'undefined'){
      if(localStorage.getItem('cart')){
        setCartItems(JSON.parse(localStorage.getItem('cart')))
      }
    }

  },[])


  return (
    <>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route path="/product/:id" render={(props) => (<ProductScreen {...props} setCartItems={setCartItems} cartItems={cartItems} />)} />
          <Route path="/cart/:id?" render={(props) => (<CartScreen {...props} setCartItems={setCartItems} cartItems={cartItems} />)} />
        </Switch>
      </main>
      <Footer/>
    </>
  )
}

export default App

