import React from 'react'
import { Route, Switch } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route path="/product/:id" component={ProductScreen} />
        </Switch>
      </main>
      <Footer/>
    </>
  )
}

export default App

