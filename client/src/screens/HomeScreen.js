import React, { useState, useEffect } from 'react'
import { Col, Row,Spin,Carousel, Typography } from 'antd'
import axios from 'axios'
import Product from '../components/Product'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 80,marginTop:140 }} spin />;

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get('/api/products')
        setProducts(data)
        setLoading(false)
      }
      fetchProducts()
  },[])

  return (
    <span className="text-center">
      <Typography>
        <Typography.Title>Latest Books</Typography.Title>
      </Typography>
      {loading && <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Spin indicator={antIcon}/>
      </div>}
      <Row align="middle" justify="center" gutter={[32,32]}>
        {products.map((product) => (
          <Col key={product._id}>
            <Product loading={loading} product={product} />
          </Col>
        ))}
      </Row>
    </span>
  )
}

export default HomeScreen
