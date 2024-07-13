import React, { useContext, useState } from 'react'
import './CartItem.scss'
import {  changeQuantity } from '@/store/cartSlice ';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {ThemeContext} from '../../providers/ThemeProvider'

const CartItem = ({product}) => {
  const apiUrl = import.meta.env.APP_API_URL;
  const [quantity, setQuantity] = useState(product.quantity)
  const dispach = useDispatch()
  const {theme} = useContext(ThemeContext);

  // const handleIncreaseQuantity = () => {
  //   seQuantity(prev => prev +1)
  //   dispach(changeQuantity({product, quantity}))
  // };
  // const handleDecreaseQuantity = () => {
  //   seQuantity(prev => prev -1)
  // };

  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
    dispach(changeQuantity({product, quantity}))

  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      dispach(changeQuantity({product, quantity}))
    }
  };

  return (

    <div className={`cartitem ${theme ? 'cartitem-dark' : ''}`}>
        <div className="cartitem__image">
            <img src={`${apiUrl}${product.image}`} alt={product.title} />
        </div>

        <div className={`cartitem__info ${theme ? 'cartitem__info-dark' : ''}`}>
      
            <div className="cartitem__info_title-container">  
              <Link to={`/products/${product.id}`} className="item__title">
                <span>{product.title}</span>  
              </Link>
             <button>X</button> 
            </div>

            <div className="cartitem__info__price-wraper">

              <div className={`cartitem__info__price-wraper_quantity-container ${theme ? 'cartitem__info__price-wraper_quantity-container-dark' : ''}`}>
                <button onClick={handleDecreaseQuantity} >-</button>
                <p>{quantity}</p> 
                <button onClick={handleIncreaseQuantity}>+</button>
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
