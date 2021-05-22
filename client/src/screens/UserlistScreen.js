import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, message, Row, Spin,Col,Card, Popconfirm, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 50, marginBottom: 50 }} spin />;

const UserlistScreen = ({history}) => {

  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(true)
  const [isDeleted,setIsDeleted] = useState(false)

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
        setLoading(false)
      } catch (error) {

      }
    }
    fetchUsers()
  },[isDeleted])

  const deleteHandler = async (id) => {
      try {
        const { data } = await axios.delete(`/api/users/delete/${id}`)
        message.success(data.message)
        setIsDeleted(!isDeleted)

      } catch (error) {
        message.error("User not found")
      }
  }


  return (
    <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
      <Row gutter={[12, 12]} justify="space-around" >

        <Col style={{ marginTop: "60px" }} sm={24} xs={24} md={24} lg={24}>
          <Card style={{ textAlign: "center" }}>
            <h1>Users</h1>
            {loading ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Spin indicator={antIcon} />
            </div>) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ textAlign: "center" }} className="table">
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
                        ADMIN STATUS
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
                          <td>{user.isAdmin ? <Tag color="green">ADMIN</Tag> : <Tag color="geekblue">USER</Tag>}</td>
                          <td style={{ whiteSpace: "nowrap" }}><Link to={`/admin/user/${user._id}/edit`}><Button><EditOutlined /></Button></Link>
                            <Popconfirm placement="right" title="Are you sure you want to delete the user" okText="Yes" cancelText="Cancel" onConfirm={() => deleteHandler(user._id)}>
                              <Button style={{ marginLeft: "5px", background: "#ff2925", color: "white", border: "#ff2925" }}>
                                <DeleteOutlined />
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                </div>
            )}

      </Card>
      </Col>
      </Row>
    </div>
  )
}

export default UserlistScreen
