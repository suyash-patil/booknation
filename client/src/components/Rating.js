import React from 'react'

const Rating = ({value,text}) => {
  return (
    <p className="rating">
      <span style={{color:"#f8e825"}}>
        <span>
          <i className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
          <i className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
          <i className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
          <i className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
        <span>
          <i className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
        </span>
      </span>
      <span style={{color:"black"}} className="pl-1">{text && text}</span>
    </p>
  )
}

export default Rating
