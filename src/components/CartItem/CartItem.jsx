import React from 'react'

const CartItem = ({product}) => {
  return (
    <div>
        <span>
            <h3>{product.title}</h3>
            <h5>{product.price}</h5>           
        </span>

    </div>
  )
}

export default CartItem
