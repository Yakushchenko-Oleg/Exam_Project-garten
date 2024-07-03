import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.scss'
import CartItem from '../../components/CartItem/CartItem'

const Cart = () => {
  const cart =  [
    {
      id: 1,
      title: "Savannah Summer Annual Collection",
      price: 53,
      discont_price: 50,
      description: "We love this fusion of colorful blossoms, created by combining some of the most floriferous and high performance annuals we know in our Savannah Summer Collection. Cherry-red Zinnia and sunrise-hued Lantana provide a perpetual fountain of flowers amidst the dark purple spiky foliage of Tradescantia.",
      image: "/product_img/1.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
      count: 1,
    },
    {
      id: 2,
      title: "Angelonia angustifolia Archangel™ White",
      price: 10.75,
      discont_price: null,
      description: "Angelonia angustifolia Archangel™ White displays pristine white blossoms arranged on tall stems that sparkle above clean, glossy, dark green foliage. These sturdy, well-branched plants add texture and commanding presence to borders, containers, and flower arrangements.",
      image: "/product_img/2.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
      count: 1,
    },
  ]
  
  let sum = cart.reduce((acc, curent) => {
    return acc + (curent.price * curent.count)
  }, 0)

  return (
    <main className="maincontainer">
      <div className="cart">

        <div className="cart__header-wrapper">
          <h2>Shopping cart</h2>
          <div className="cart__line"></div>
          <Link to="/allproducts">
            <span className="categories__link">Back to the store</span>
          </Link>
        </div>

        {
          cart.length > 0 ? 
          <div className="cart__content">
            <div className="cart__content_list">
              {
                 cart && cart.map(item => <CartItem product={item} key={item.id}/>)
              }
            </div>
            <form className='cart__content_form' action="">
              <h3>Order details</h3>
              <p>{`${cart.length} item`}</p>
              <div className="cart__content_form_totoalConteiner">
                <p>Total</p>
                <p>{`$${sum}`}</p>
              </div>

            </form>
        
             
          </div>
          : 
          <div className="cart__enpty">
            <span>Looks like you have no items in your basket currently.</span>
            <button> Continue Shopping </button>
          </div>
        }


      </div>



  </main>
  )
}

export default Cart