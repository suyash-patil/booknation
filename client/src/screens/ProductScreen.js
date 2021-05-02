import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {List, Row, Col, Image, Card, Button} from 'antd'
import axios from 'axios'
import Rating from '../components/Rating'
import {DollarTwoTone} from '@ant-design/icons'

const ProductScreen = ({match}) => {

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
  },[match])

  const data = [
    `Price: $${product.price}`,
    `Status: ${product.countInStock ? 'Out Of Stock' : 'In Stock'}`
  ];

  return (
    <span>
      <Link className="go-back" to="/">
        {/* <Button type="primary">Go Back</Button> */}
      </Link>
      <span>
        <Row justify="space-around">
          <Col>
            <Image width="250px" height="300px" src={product.image} alt={product.name} />
          </Col>
          <Col>
            <h3>{product.name}</h3>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              <div className="mt-2">
              Price: ${product.price}
              </div>
              <div className="mt-2">
              Description: {product.description}
              </div>

          </Col>
          <Col>
            <Card>
                  <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        {item}
                      </List.Item>
                    )}
                  />
              <Button danger type="primary" className="btn-block"
                style={{ marginTop: "0.3rem" }} disabled={product.countInStock === 0}>
                Add to Cart
            </Button>
            </Card>
          </Col>
        </Row>
      </span>
    </span>
  )
}

export default ProductScreen
