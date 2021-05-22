import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, message, Row, Spin, Col, Card, Popconfirm, Tag,Modal,Form,Upload, Input,Progress } from 'antd'
import firebase from 'firebase'
import {storage} from '../firebase'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 50, marginBottom: 50 }} spin />;
const {Dragger} = Upload
const ProductlistScreen = ({ history }) => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)
  const [productModal,setProductModal] = useState(false)
  const [name,setName] = useState('')
  const [author,setAuthor] = useState('')
  const [description,setDesc] = useState('')
  const [price,setPrice] = useState('')
  const [countInStock,setStock] = useState(1)
  const [image,setImage]= useState('')
  const [progess,setProgress] = useState(0)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

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
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [isDeleted])

  const uploadFileHandler = async (e) => {

    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const productHandler = async (info) => {

    var fileTypes = ["image"];
    let filetype = image.type.split("/")[0];

    const date = Date.now()

    if (!fileTypes.includes(filetype)) {
      return message.error("file type not supported");
    }

    const uploadTask = storage.ref(`images/${date}-${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);

      },
      (error) => {
        message.error(error.message)
      },
      () => {
        storage.ref("images")
          .child(`${date}-${image.name}`)
          .getDownloadURL()
          .then(async(url) => {
            const config2 = {
              headers: {
                'Content-Type': 'application/json'
              }
            }
            const { _id } = JSON.parse
              (localStorage.getItem('userInfo'))
            const { data } = await axios.post('/api/products/create', { name, description, price, author, countInStock, image:url, _id }, config2)
            setProductModal(false)
            message.success("Product added")
            setProgress(0)
      }
    )

  }
)
}

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/delete/${id}`)
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
            <h1>Products <Button className="float-right" id="create-prod-btn" onClick={() => setProductModal(true)}>Create Product</Button></h1>
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
                      AUTHOR
                      </th>
                    <th>
                      PRICE
                      </th>
                    <th>

                    </th>
                  </thead>
                  <tbody>
                    {products && products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.author}</td>
                        <td>{product.price}</td>
                        <td style={{ whiteSpace: "nowrap" }}><Link to={`/admin/product/${product._id}/edit`}><Button><EditOutlined /></Button></Link>
                          <Popconfirm placement="right" title="Are you sure you want to delete the user" okText="Yes" cancelText="Cancel" onConfirm={() => deleteHandler(product._id)}>
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
      <Modal
        footer={null}
        centered
        width={600}
        closable={false}
        bodyStyle={{ borderRadius: "15px", padding: "10px" }}
        visible={productModal}
        destroyOnClose
        okText="Save"
        onOk={() => {
          setProductModal(false);
        }}
        onCancel={() => setProductModal(false)}
      >
        <progress style={{width:"100%"}} value={progess} max="100" />
      <Form onFinish={productHandler}>

        <Form.Item>
          <Input name="image" type="file" onChange={uploadFileHandler}/>
        </Form.Item>
        <Form.Item>
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        </Form.Item>
          <Form.Item>
            <Input placeholder="author" onChange={(e)=> setAuthor(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
          </Form.Item>
          <Form.Item>
            <Input.TextArea placeholder="desc" onChange={(e) => setDesc(e.target.value)}/>
          </Form.Item>
          <Form.Item>
            <Input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
          </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </div>
  )
}

export default ProductlistScreen
