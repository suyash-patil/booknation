import axios from 'axios';
import React,{useState,useEffect} from 'react'

const LoginScreen = ({history,setUser,user}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/users/login`, { email, password }, config);

      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
        setUser(JSON.parse(localStorage.getItem('userInfo')))
        history.push('/')
      }
    }
    catch(error) {
      console.log('Invalid Email and password')
    }
  }

  return (
    <div>
      <form>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={loginHandler} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginScreen
