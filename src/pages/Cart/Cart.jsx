import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.scss'
import CartItem from '@/components/CartItem/CartItem'
import {ThemeContext} from '@/providers/ThemeProvider'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchOrder } from '../../store/cartSlice '
import Modal from '../../components/Modal/Modal'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state =>state.cart.cart)
  const [isOrderPlaced, setisOrderPlaced] = useState(false)
  const [totalSum, setTotalSum] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const {theme} = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    } = useForm()

  useEffect(() => {
    if (cart) {
      setTotalSum(+(cart.reduce((acc, current) => acc + ((current.discont_price? current.discont_price : current.price )* current.quantity), 0)).toFixed(2)); // С помощью метода reduce проходимся по массиву и подсчитываем сумму содержимого, с помощью toFixed  округляем цифру до 2-х знаков после запятой, с помощью + переводим данные в формат number т.к. метод toFixed переаодит данные автоматически в строку
      setTotalQuantity(cart.reduce((acc, current) => acc + current.quantity, 0));// С помощью метода reduce проходимся по массиву и подсчитываем общее количество содержимого
    }
  }, [cart]);
 
  useEffect(()=>{
    if (isSubmitSuccessful) {
      setisOrderPlaced(true)
    }
  },[isSubmitSuccessful]) 

  const handleOrderSubmit =  (data) => {
    dispatch( fetchOrder({...data, order: cart}))
    reset()
  }

  return (
    <main className="maincontainer">

      {
        isSubmitting 
        ? <div>Loading Order....</div> 
        : <div className="cart container">
            <div className="header-wrapper">
              <h2>Shopping cart</h2>
              <div className="cart__line"></div>
              <Link to="/allproducts">
                <span className="cart__link">Back to the store</span>
              </Link>
            </div>

            {
              cart && cart.length > 0 
              ? <div className="cart__content">
                  <div className="cart__content_list">
                    {cart &&
                      cart.map((item) => <CartItem product={item} key={item.id} />)}
                  </div>
              
                  <form className={`cart__content_form ${theme ? 'cart__content_form-dark' : ''}`} 
                    onSubmit={ handleSubmit(handleOrderSubmit)}>
                      
                    <h3>Order details</h3>
                    <p>{`${totalQuantity} item`}</p>

                    <div className="cart__content_form_totoalConteiner">
                      <p>Total</p>
                      <h3>{`$${totalSum}`}</h3>
                    </div>

                    <input  className={`cart__input ${theme ? 'cart__input-dark' : 'cart__input-light'}`} 
                      placeholder="Name"
                      type="text"
                      id="username"
                      name="username"
                      {...register("username", {
                        required: 'Name required',
                        minLength:{value: 2, message: 'Minimum name length 2 letters'},
                        maxLength:{ value: 20, message: 'Maximum name length 20 letters'}
                      })}
                    />
                    <p className='cart__errornessage'>{errors.username?.message}</p>

                    <input className={`cart__input ${theme ? 'cart__input-dark' : 'cart__input-light'}`}
                      placeholder="Phone number"
                      type="tel"
                      id="phonenumber"
                      name="phonenumber"
                      {...register('phonenumber', {
                        required: 'Phone number required',
                        pattern: {
                          value: /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
                          message: 'Incorrect phone number'
                        },
                      })}
                    />
                    <p className='cart__errornessage'>{errors.phonenumber?.message}</p>

                    <input className={`cart__input ${theme ? 'cart__input-dark' : 'cart__input-light'}`}
                      placeholder="Email"
                      type="text"
                      id="email"
                      name="email"
                      {...register("email", {
                        required: 'Email required',
                        pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'Incorrect email format'}
                      })}
                    />
                    <p className='cart__errornessage'>{errors.email?.message}</p>

                    <button>Order</button>
                  </form>

                  <Link to="/allproducts">
                    <span className="cart__link cart__link-hidden">
                      Back to the store
                    </span>
                  </Link>
                </div>
            
              : <div className="cart__enpty">
                  <span>Looks like you have no items in your basket currently</span>
                  <Link to="/allproducts">
                    <button className="btn"> Continue Shopping </button>
                  </Link>
                </div>
            }

          </div>
      }


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