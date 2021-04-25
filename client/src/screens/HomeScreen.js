import React from 'react'
import { Col, Row } from 'antd'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <span className="text-center">
      <h1>Latest Books</h1>
      <Row align="middle" justify="center" gutter={[12,12]}>
        {products.map((product) => (
          <Col>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </span>
  )
}

export default HomeScreen
