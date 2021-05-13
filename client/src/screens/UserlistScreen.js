import { Button, message } from 'antd'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

const UserlistScreen = ({history}) => {

  const [users,setUsers] = useState([])

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  useEffect(() => {
    if(!localStorage.getItem('userInfo')){
      history.push("/")
      message.error("You must be logged in")
    }
    if(localStorage.getItem('userInfo')){
      const {isAdmin} = JSON.parse(localStorage.getItem('userInfo'))
      if(!isAdmin){
        history.push('/')
        message.info("You must be an Admin")
      }
    }
  },[history])

  useEffect(() => {

    const fetchUsers = async() => {
      try {
        const { email } = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.post('/api/users', { email }, config)
        setUsers(data)
        console.log(users)
      } catch (error) {

      }
    }
    fetchUsers()
  },[])


  return (
    <div>
      <h1>Users</h1>
      <table style={{textAlign:"center",overflowX:"auto"}} className="table">
        <thead>
          <th>
            ID
          </th>
          <th>
            NAME
          </th>
          <th>
            EMAIL
          </th>
          <th>
            ADMIN
          </th>
          <th>

          </th>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'True' : 'False'}</td>
              <td><Link to={`/user/${user._id}/edit`}><Button>Details</Button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserlistScreen
