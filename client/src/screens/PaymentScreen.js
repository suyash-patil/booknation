import React, { useEffect, useState } from 'react'

const PaymentScreen = ({history}) => {

  const [paymethod,setPaymethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    localStorage.setItem('paymethod',JSON.stringify({paymethod}))
    history.push('/placeorder')
  }

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push('/')
    }
    else if(!localStorage.getItem('shipAddress')){
      history.push('/shipping')
    }

  },[history])
  return (
    <div>
      <form>
        <input id="PayPal" name="paymethod" value='PayPal' checked onChange={(e) => setPaymethod(e.target.value)} type="radio" />
        <label >Paypal</label>
        <input id="Stripe" name="paymethod" value='Stripe' onChange={(e) => setPaymethod(e.target.value)} type="radio" />
        <label >Stripe</label>
        <button onClick={submitHandler} type="submit">submit</button>
      </form>
    </div>
  )
}

export default PaymentScreen
