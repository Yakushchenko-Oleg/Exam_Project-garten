import React, { useState } from 'react'
import './CartItem.scss'
import { addToCart } from '../../store/cartSlice ';
import { useDispatch } from 'react-redux';

const CartItem = ({product}) => {
  const apiUrl = import.meta.env.APP_API_URL;
  const dispach = useDispatch
  const [quantity, seQuantity] = useState(product.quantity)

  const handleAddToCart = () => {
    seQuantity(prev => prev +1)
    dispach(addToCart({product, quantity}))
  };

  return (

    <div className='cartitem'>
        <div className="cartitem__image">
            <img src={`${apiUrl}${product.image}`} alt={product.title} />
        </div>

        <div className="cartitem__info">
      
            <div className="cartitem__info_title-container">  
             <span>{product.title}</span>  
             <button>X</button> 
            </div>

            <div className="cartitem__info__price-wraper">

              <div className="cartitem__info__price-wraper_quantity-container">
                <button>-</button>
                <p>{product.quantity}</p> 
                <button onClick={handleAddToCart}>+</button>
              </div>

              <div className="cartitem__info__price-wraper_price-container">
                {
                product.discont_price ? (
                <>
                  <span className="discount-price">{`$${product.discont_price}`}</span>
                  <span className="original-price">{`$${product.price}`}</span>
                </>
                  ) : (
                    <span className="info-price">{`$${product.price}`}</span>
                  )}
              </div>

            </div>

        </div>
        
    </div>
  )
}

export default CartItem
