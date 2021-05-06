import axios from 'axios'
import React,{useState} from 'react'

const RegisterScreen = ({setUser,user}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`/api/users/register`,{name,email,password},config)
      if(data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
        setUser(JSON.parse(localStorage.getItem('userInfo')))
      }
    } catch(error) {
      console.log('Invalid Data')
    }
  }

  return (
    <div>
      <form>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={registerHandler} type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterScreen
