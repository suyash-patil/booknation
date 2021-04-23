import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header/>
      <main className="text-center">
        <HomeScreen/>
      </main>
      <Footer/>
    </>
  )
}

export default App

