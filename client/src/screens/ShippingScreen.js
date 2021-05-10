import { message } from 'antd'
import React, { useEffect, useState } from 'react'

const ShippingScreen = ({history}) => {
  const [address,setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country,setCountry] = useState('')

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push('/')
      message.info("You must be logged in")
    }
    if(localStorage.getItem('cart')){
      if (!(JSON.parse(localStorage.getItem('cart'))).length) {
        history.push("/")
        message.info("Cart is empty")
        return
      }
    }
    if(!localStorage.getItem('Cart')){
      history.push("/")
      message.info("Cart is empty")
    }
  },[history])

  const submitHandler = (e) => {
    e.preventDefault()
    localStorage.setItem('shipAddress', JSON.stringify({address,city,postalCode,country}))
    history.push('/payment')
  }


  return (
    <div>
      <form>
        <input value={address} onChange={(e) => setAddress(e.target.value)}/>
        <input value={city} onChange={(e) => setCity(e.target.value)}/>
        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
        <input value={country} onChange={(e) => setCountry(e.target.value)}/>
        <button onClick={submitHandler} type="submit">submit</button>
      </form>
    </div>
  )
}

export default ShippingScreen
