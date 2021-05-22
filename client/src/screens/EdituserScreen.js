import React,{useEffect,useState} from 'react'
import { Card, Col, Row,Input,Button,message, Tag, Spin } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 90, marginBottom: 80 }} spin />;

const EdituserScreen = ({history,match}) => {

  const [userData,setUserData] = useState(null)
  const [loading,setLoading] = useState(true)
  const [isEdited,setIsEdited] = useState(false)
  const [edit,setEdit] = useState(false)
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [create, setCreate] = useState('')
  const [update, setUpdate] = useState('')
  const [isAdmin,setAdmin] = useState()

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      history.push("/")
      message.error("You must be logged in")
    }
    if (localStorage.getItem('userInfo')) {
      const { isAdmin } = JSON.parse(localStorage.getItem('userInfo'))
      if (!isAdmin) {
        history.push('/')
        message.info("You must be an Admin")
      }
    }
  }, [history])

  useEffect(() => {
    const fetchUser =async () => {
      const {data} = await axios.get(`/api/users/getuser/${match.params.id}`)
      setUserData(data)
      setAdmin(data.isAdmin)
      setEmail(data.email)
      setName(data.name)
      setCreate(data.createdAt)
      setUpdate(data.updatedAt)
      setLoading(false)
    }
    fetchUser()
  },[match])

  const updateHandler = async () => {
    try {
      const { data } = await axios.put(`/api/users/edituser/${match.params.id}`, { name, isAdmin })
      message.success('Profile updated successfully')
      setAdmin(data.isAdmin)
      setName(data.name)
      setEdit(false)
    } catch (error) {
      message.error("Request unsuccessful")
    }
  }

  return (
      <div style={{ marginTop: "0px", backgroundColor: "#002766", maxHeight: "120px" }}>
        <Row gutter={[12, 12]} justify="center" >

          <Col style={{ marginTop: "60px" }} sm={24} xs={24} md={24} lg={12}>
            <Card style={{ textAlign: "center" }}>
              {loading ? (
              (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spin indicator={antIcon} />
              </div>)
              ) : (<>
                {
                  edit?(
                <>
                  <form style={{ marginLeft: "0", marginTop: "20px" }}
            >
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      Name
                      </td>
                    <td>
                      <Input value={name} required={true} onChange={(e) => { setName(e.target.value) }} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Email
                      </td>
                    <td>
                      <Input value={email} disabled />
                    </td>
                  </tr>
                  <tr>

                    <td>
                      <Checkbox checked={isAdmin} onChange={() => setAdmin(!isAdmin)}>IS ADMIN</Checkbox>
                    </td>
                  </tr>


                </tbody>
              </table>

              <Button style={{ color: "white", backgroundColor: "#096dd9", border: "1px solid #096dd9" }} type="primary" onClick={updateHandler}>Update Profile</Button>
            </form>
                </>
              ) : (
                <>
            <table className="table">
              <tbody>
              <tr>
                <td>
                  Name
                </td>
                <td>
                  {name}
                </td>
              </tr>
                <tr>
                  <td>
                    Email
                      </td>
                  <td>
                    {email}
                  </td>
                </tr>
                <tr>
                  <td>
                    Profile Created
                      </td>
                  <td>
                    {create.split("T")[0]}
                  </td>
                </tr>
                <tr>
                  <td>
                    Profile Updated
                      </td>
                  <td>
                    {update.split("T")[0]}
                  </td>
                </tr>
                <tr>
                  <td>
                    Admin Status
                      </td>
                  <td>
                    {isAdmin ? <Tag color="green">ADMIN</Tag> : <Tag color="geekblue">USER</Tag>}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button style={{ color: "white", backgroundColor: "#096dd9", border: "1px solid #096dd9" }} type="primary" onClick={() => setEdit(true)}>Edit User</Button>
          </>
              )}
              </>)}
            </Card>
          </Col>
          </Row>
    </div>
  )
}

export default EdituserScreen
