import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Input, Button, message, Tag, Spin, Typography,Image,List,Form,Select,Checkbox, InputNumber } from 'antd'
import axios from 'axios'
import { LoadingOutlined,StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 90, marginBottom: 80 }} spin />;
const {Title,Paragraph} = Typography

const EdituserScreen = ({ history, match }) => {

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [edit, setEdit] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [price,setPrice] = useState(0)
  const [author,setAuthor] = useState('')
  const [description,setDesc] = useState('')
  const [image,setImage] = useState('')
  const [countInStock,setStock] = useState(0)

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
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
      setLoading(false)
      setName(data.name)
      setAuthor(data.author)
      setDesc(data.description)
      setPrice(data.price)
      setStock(data.countInStock)
      setImage(data.image)
    }
    fetchProduct()
  }, [match,isUpdated])

  const uploadFileHandler = async (e) => {

    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const updateHandler = async () => {
    try {
      const { data } = await axios.put(`/api/products/update/${match.params.id}`, { name, price, author, description, image, countInStock })
      message.success('Product updated successfully')
      setEdit(false)
      setIsUpdated(!isUpdated)
    } catch (error) {
      message.error("Request unsuccessful")
    }
  }

  return (
    <span>
      <Link className="go-back" to="/">
        {/* <Button type="primary">Go Back</Button> */}
      </Link>
    <span>
                {loading ? (
              (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spin indicator={antIcon} />
              </div>)
            ) : (<>
              {
                edit ? (
                  <>
                    <form style={{ marginLeft: "0", marginTop: "20px" }}
                    >
                      <table className="table">
                        <tbody>
                        <tr>
                          <td>
                            Image
                          </td>
                          <td>
                            <Input type="file" placeholder={image} onChange={uploadFileHandler} />
                          </td>
                        </tr>
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
                              Author
                      </td>
                            <td>
                              <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </td>
                          </tr>
                        <tr>
                          <td>
                            Price
                      </td>
                          <td>
                            <InputNumber min={0.00} step="0.01" value={price} onChange={(e) => setPrice(e)} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Description
                      </td>
                          <td>
                            <Input.TextArea rows={4} showCount value={description} onChange={(e) => setDesc(e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Stock
                      </td>
                          <td>
                            <InputNumber min={1} value={countInStock} onChange={(e) => setStock(e)} />
                          </td>
                        </tr>

                        </tbody>
                      </table>

                      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Button style={{ color: "white",marginBottom:"80px", backgroundColor: "#096dd9", border: "1px solid #096dd9" }} type="primary" onClick={updateHandler}>Update Product</Button>
                      </div>
                    </form>
                  </>
                ) : (

                        <Row gutter={[12, 16]} justify="space-around">
                          <Col>
                            <Image width="250px" src={product.image} alt={product.name} />
                          </Col>
                          <Col style={{ textAlign: "center" }} md={6}>
                            <Typography>
                              <Title>{product.name}</Title>
                            </Typography>
                            {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
                            <Tag color="#388e3c">{product.rating} <StarFilled /></Tag>
                            <Tag color="green">{product.numReviews} Reviews</Tag>
                            <span className="mt-2">
                              <Typography>
                                <Title style={{ marginTop: "0.7rem", fontSize: "1.5rem", fontWeight: "400" }}>Author</Title>
                                <Paragraph><i>{product.author}</i></Paragraph>
                              </Typography>
                            </span>
                            <span>
                              <Typography>
                                <Title style={{ fontSize: "1.5rem", fontWeight: "400" }}>Description</Title>
                                <Paragraph style={{ color: "grey" }}>{product.description}</Paragraph>
                              </Typography>
                            </span>
                          </Col>
                          <Col style={{ width: "250px" }}>
                            <Card>
                              <List>
                                <List.Item><span style={{ marginLeft: "1em" }}>Price:</span> <span style={{ marginLeft: "6.2em" }}>${product.price}</span></List.Item>
                                <List.Item><span style={{ marginLeft: "1em" }}>Stock:</span> <span style={{ textAlign: "center", marginLeft: "7em" }}>{product.countInStock ? `${product.countInStock}` : "Out of Stock"}</span> </List.Item>
                                <List.Item><Button onClick={() => setEdit(true)}>Edit Product</Button></List.Item>
                              </List>
                              {/* ref={btnRef} will come in the element */}

                            </Card>
                          </Col>
                        </Row>
                )}
            </>)}
          </span>
          </span>
  )
}

export default EdituserScreen
