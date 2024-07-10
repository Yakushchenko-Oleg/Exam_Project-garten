import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.scss'
import CartItem from '../../components/CartItem/CartItem'
import { useSelector } from 'react-redux'


const Cart = () => {
  const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')))
  const [totalSum, setTotalSum] = useState(0)
  const [totalQontity, setTotalQontity] = useState(0)

useEffect(()=> {


  setTotalSum(cart?.reduce((acc, curent) => {
    return acc + (curent.price * curent.quantity)
  }, 0))
  setTotalQontity(cart?.reduce((acc, curent) => {
    return acc + curent.quantity
  }, 0))
}, [cart])

  return (
    <main className="maincontainer">
      <div className="cart container">

        <div className="header-wrapper">
          <h2>Shopping cart</h2>
          <div className="cart__line"></div>
          <Link to="/allproducts">                                  
            <span className="cart__link">Back to the store</span>
          </Link>
        </div>

        {
          cart && cart.length > 0 ? 
          <div className="cart__content">
            <div className="cart__content_list">
              {
                cart && cart.map(item => <CartItem product={item} key={item.id}/>)
              }
            </div>
            <form className='cart__content_form' action="">
              <h3>Order details</h3>
              <p>{`${totalQontity} item`}</p>
              <div className="cart__content_form_totoalConteiner">
                <p>Total</p>
                <h3>{`$${totalSum}`}</h3>
              </div>

              <input type="text" placeholder='Name'/>
              <input type="text"  placeholder='Phone number'/>
              <input type="text" placeholder='Email'/>
              <button>Order</button>


            </form>
        
          <Link to="/allproducts">
            <span className="cart__link cart__link-hidden">Back to the store</span>
          </Link>  
          </div>
          : 
          <div className="cart__enpty">
            <span>Looks like you have no items in your basket currently</span>
            <Link to="/allproducts">
            <button className='btn'> Continue Shopping </button></Link>
          </div>
        }

        
      </div>



    </main>
  )
}

export default Cart