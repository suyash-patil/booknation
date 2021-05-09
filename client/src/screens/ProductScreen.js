import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {List, InputNumber, Form, Row, Col, Image, Card, Button,Spin, Select} from 'antd'
import axios from 'axios'
import Rating from '../components/Rating'
import {DollarTwoTone} from '@ant-design/icons'
import { addItem } from '../helpers/cartHelper'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 80, marginTop: 70 }} spin />;

const ProductScreen = ({history, match,setCartItems,cartItems}) => {

  const [product, setProduct] = useState({})
  const [qty,setQty] = useState(1)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  },[match])

  const addToCartHandler = () => {
      addItem(product,qty);
      setCartItems(JSON.parse(localStorage.getItem('cart')))
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
          <Row justify = "space-around">
          <Col>
            <Image width="250px" src = {product.image} alt={product.name} />
          </Col>
      <Col>
        <h3>{product.name}</h3>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <div className="mt-2">
          Price: ${product.price}
        </div>
        <div className="mt-2">
          Author: {product.author}
        </div>

      </Col>
      <Col style={{ width: "250px" }}>
        <Card>
          <List>
            <List.Item><span style={{ marginLeft: "1em" }}>Price:</span> <span style={{ marginLeft: "7em" }}>${product.price}</span></List.Item>
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
