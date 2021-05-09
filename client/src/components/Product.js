import React from 'react'
import {Card, Image} from 'antd'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
const {Meta} = Card

const Product = ({product}) => {
  return (
    <Card hoverable>
      <Link to={`/product/${product._id}`}>
        <img style={{ marginTop:"10px", minWidth:"230px", height: "230px", objectFit:"contain", justifyContent: "center" }} src={product.image} />
        <Meta style={{margin:"10px auto"}} title={product.name} />
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        <h6>${product.price}</h6>
      </Link>
    </Card>
  )
}

export default Product
