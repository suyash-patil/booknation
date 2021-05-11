import React, {useState, useEffect,useRef} from 'react'
import {Link} from 'react-router-dom'
import {List,message, InputNumber, Tag, Form, Row, Col, Image, Card, Button,Spin, Select, Typography} from 'antd'
import axios from 'axios'
import Rating from '../components/Rating'
import {DollarTwoTone, StarFilled} from '@ant-design/icons'
import { addItem } from '../helpers/cartHelper'
import { LoadingOutlined,StarOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 150 }} spin />;

const ProductScreen = ({history, match,setCartItems,cartItems}) => {

  const [product, setProduct] = useState({})
  const [qty,setQty] = useState(1)
  const [loading,setLoading] = useState(true)
  // let btnRef = useRef()

  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  },[match])

  const addToCartHandler = () => {
      if(!localStorage.getItem('userInfo')){
        history.push("/login")
        message.info("You must be logged in!")
        return
      }
      // if (btnRef.current) {
      //   btnRef.current.setAttribute("disabled", "disabled");
      // }
      addItem(product,qty);
      setCartItems(JSON.parse(localStorage.getItem('cart')))
      message.success(`Book added to cart`)
      // It prevents users to click Add to cart button multiple times
      // setTimeout(function () { btnRef.current.removeAttribute("disabled") }, 3000);
  }

  return (
    <span>
      <Link className="go-back" to="/">
        {/* <Button type="primary">Go Back</Button> */}
      </Link>
      <span>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <Row gutter={[12,16]} justify = "space-around">
          <Col>
            <Image width="250px" src = {product.image} alt={product.name} />
          </Col>
      <Col style={{textAlign:"center"}} md={6}>
          <Typography>
              <Title>{product.name}</Title>
          </Typography>
        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
        <Tag color="#388e3c">{product.rating} <StarFilled/></Tag>
        <Tag color="green">{product.numReviews} Reviews</Tag>
        <span className="mt-2">
          <Typography>
            <Title style={{ marginTop: "0.7rem", fontSize: "1.5rem", fontWeight: "400"}}>Author</Title>
              <Paragraph><i>{product.author}</i></Paragraph>
          </Typography>
        </span>
        <span>
          <Typography>
            <Title style={{ fontSize: "1.5rem",fontWeight:"400" }}>Description</Title>
            <Paragraph style={{color:"grey"}}>{product.description}</Paragraph>
          </Typography>
        </span>
      </Col>
      <Col style={{ width: "250px" }}>
        <Card>
          <List>
            <List.Item><span style={{ marginLeft: "1em" }}>Price:</span> <span style={{ marginLeft: "6.2em" }}>${product.price}</span></List.Item>
            <List.Item><span style={{ marginLeft: "1em" }}>Status:</span> <span style={{ textAlign: "center", marginLeft: "5.5em" }}>{product.countInStock ? "In Stock" : "Out of Stock"}</span> </List.Item>
            <List.Item>
              {/* We can avoid product.countInStock>0 ? <>something</> : <>nothing</> */}
              {product.countInStock > 0 && (
                <Form style={{ marginLeft: "-4em", width: "auto" }}>
                  <Form.Item label="Quantity">
                    <Select style={{ width: "7em", textAlign: "center" }} value={qty} onChange={(value) => setQty(value)} >
                      {
                        [...Array(product.countInStock).keys()].map((x, index) => (
                          <Select.Option style={{ textAlign: "center" }} key={index} value={x + 1}>{x + 1}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Form>

              )}
            </List.Item>
          </List>
          {/* ref={btnRef} will come in the element */}
          <Button onClick={addToCartHandler} danger type="primary" className="btn-block"
            style={{ marginTop: "0.3rem" }} disabled={product.countInStock === 0}>
            Add to Cart
            </Button>
        </Card>
      </Col>
        </Row>
        )}
      </span>
    </span>
  )
}

export default ProductScreen
