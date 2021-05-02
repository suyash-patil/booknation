import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get('/api/products')
        setProducts(data)
      }
      fetchProducts()
  },[])

  return (
    <span className="text-center">
      <h1>Latest Books</h1>
      <Row align="middle" justify="center" gutter={[12,12]}>
        {products.map((product) => (
          <Col key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </span>
  )
}

export default HomeScreen
