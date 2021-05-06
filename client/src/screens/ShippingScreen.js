import React, { useEffect, useState } from 'react'

const ShippingScreen = ({history}) => {
  const [address,setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalcode, setPostalCode] = useState('')
  const [country,setCountry] = useState('')

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push('/')
    }
    else {

    }
  },[history])

  const submitHandler = (e) => {
    e.preventDefault()
    localStorage.setItem('shipAddress', JSON.stringify({address,city,postalcode,country}))
    history.push('/payment')
  }


  return (
    <div>
      <form>
        <input value={address} onChange={(e) => setAddress(e.target.value)}/>
        <input value={city} onChange={(e) => setCity(e.target.value)}/>
        <input value={postalcode} onChange={(e) => setPostalCode(e.target.value)}/>
        <input value={country} onChange={(e) => setCountry(e.target.value)}/>
        <button onClick={submitHandler} type="submit">submit</button>
      </form>
    </div>
  )
}

export default ShippingScreen
