import React, { useState, useEffect } from 'react'
import { Col, Row,Spin } from 'antd'
import axios from 'axios'
import Product from '../components/Product'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 80,marginTop:70 }} spin />;

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
      <h1>Latest Books</h1>
      {loading && <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Spin indicator={antIcon}/>
      </div>}
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
