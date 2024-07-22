import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.scss'
import CartItem from '@/components/CartItem/CartItem'
import {ThemeContext} from '@/providers/ThemeProvider'
import { useSelector } from 'react-redux'
import Modal from '../../components/Modal/Modal'

const Cart = () => {;
  const cart = useSelector(state =>state.cart.cart)
  const [isOrderPlaced, setisOrderPlaced] = useState(false)
  const [totalSum, setTotalSum] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const {theme} = useContext(ThemeContext);


  useEffect(() => {
    if (cart) {
      setTotalSum(cart.reduce((acc, current) => acc + (current.price * current.quantity), 0));
      setTotalQuantity(cart.reduce((acc, current) => acc + current.quantity, 0));
    }
  }, [cart]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log('order placed');
  };

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

        {cart && cart.length > 0 ? (
          <div className="cart__content">
            <div className="cart__content_list">
              {cart &&
                cart.map((item) => <CartItem product={item} key={item.id} />)}
            </div>
            <form onSubmit={handleSubmitForm}
              className={`cart__content_form ${
                theme ? "cart__content_form-dark" : ""
              }`}
            >
              <h3>Order details</h3>
              <p>{`${totalQuantity} item`}</p>
              <div className="cart__content_form_totoalConteiner">
                <p>Total</p>
                <h3>{`$${totalSum}`}</h3>
              </div>

              <input
                className={`cart__input ${
                  theme ? "cart__input-dark" : "cart__input-light"
                }`}
                type="text"
                placeholder="Name"
              />
              <input
                className={`cart__input ${
                  theme ? "cart__input-dark" : "cart__input-light"
                }`}
                type="text"
                placeholder="Phone number"
              />
              <input
                className={`cart__input ${
                  theme ? "cart__input-dark" : "cart__input-light"
                }`}
                type="text"
                placeholder="Email"
              />
              <button onClick={() => setisOrderPlaced(true)}>Order</button>
            </form>

            <Link to="/allproducts">
              <span className="cart__link cart__link-hidden">
                Back to the store
              </span>
            </Link>
          </div>
        ) : (
          <div className="cart__enpty">
            <span>Looks like you have no items in your basket currently</span>
            <Link to="/allproducts">
              <button className="btn"> Continue Shopping </button>
            </Link>
          </div>
        )}
      </div>

      {isOrderPlaced && (
        <Modal>
          <div className="modal-order">
            <div className="modal-order__header">
              <h2 className="modal-order__title">Congratulations!</h2>
              <button
                className="modal-order__close-button"
                onClick={() => setisOrderPlaced(false)}
              > X </button>
            </div>
            <p className='modal-order__text'>Your order has been successfully placed on the website. </p>
            <p className='modal-order__text'>A manager will contact you shortly to confirm your order.</p>
          </div>
        </Modal>
      )}

    </main>
  );
}

export default Cart