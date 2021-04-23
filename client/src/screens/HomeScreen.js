import React from 'react'
import { Col, Row } from 'antd'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row align="middle" justify="center" gutter={[16,16]}>
        {products.map((product) => (
          <Col sm={24} md={12} lg={8} xl={6}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
