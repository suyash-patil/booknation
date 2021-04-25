import React from 'react'
import {Card, Image} from 'antd'
import Meta from 'antd/lib/card/Meta'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <Card hoverable>
      <Link to={`/product/${product._id}`}>
        <img style={{ width: "250px", height: "300px", justifyContent: "center" }} src={product.image} />
        <h4>{product.name}</h4>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        <h6>${product.price}</h6>
      </Link>
    </Card>
  )
}

export default Product
