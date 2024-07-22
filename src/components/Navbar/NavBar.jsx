import React, { useContext, useEffect, useRef, useState } from 'react'
import '@/App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'
import {ThemeContext} from '@/providers/ThemeProvider'
import { RiHeartFill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import { LuMoon, LuSunMedium } from 'react-icons/lu'
import { PiSun } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import { addTofavourites, removeFromfavourites } from '@/store/favouritesSlice'
import { checkPromoProduct } from '@/store/productSlice'
import { addToCart } from "@/store/cartSlice ";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isModal, setModal] = useState(false); // не испорльзуется
  const[cartNotEmpty, setCartNotEmpty] = useState(false); 
  const[favouritesNotEmpty, setFavouritesNotEmpty] = useState(false); 
  const { cart } = useSelector(state => state.cart);
  const { favourites } = useSelector(state => state.favourites);
  const { promoProduct } = useSelector(state => state.products);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [isFavourite, setIsFavourite] = useState(false);// при нажатии на иконку,устанавливается класс active 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false); // Состояние для отслеживания добавления в корзину
  const hasRenderedOnce = useRef(false); // Флаг для отслеживания первого рендера
  const apiUrl = import.meta.env.APP_API_URL;
  const dispatch = useDispatch();
  
  useEffect(()=>{
  if (cart.length>0) {
    setCartNotEmpty(true)
  }
  else{
    setCartNotEmpty(false) 
  }
  },[cart])

  useEffect(()=>{
    if (favourites.length>0) {
      setFavouritesNotEmpty(true)
    }
    else{
      setFavouritesNotEmpty(false) 
    }
    },[favourites])

    useEffect(() => {
      if (hasRenderedOnce.current) {
        dispatch(checkPromoProduct());
      } else {
        hasRenderedOnce.current = true; // Устанавливаем флаг в true после первого рендера
      }
    }, [isModalOpen, dispatch]);

  const handleAddToFavourite = () => {
    const carentfavouriteState = !isFavourite
    setIsFavourite(carentfavouriteState)

    if (!isFavourite) {
      dispatch(addTofavourites(promoProduct))      
    } else {
      dispatch(removeFromfavourites(promoProduct))      
    }
  };
  
  const handleAddToCart = (product) => {
    console.log('Product added to cart!'); 
    dispatch(addToCart({product, quantity: 1}))
    setAddedToCart(true); 
  };

   
  
  return (
    <>
      <nav className={ `navbar ${theme ? 'navbar-dark' : 'navbar-light'}  `}>
    
      <div className="navbar__logo">
        <img src="/images/navbar/logo.png" />
            
        <div className="nav__action" onClick={toggleTheme} >
          <label className={`switch ${theme ? "switch-active" : ""}`} htmlFor='checkbox'>
            <input className='switch__input' type='checkbox' name='checkbox'  ></input>
              <span className="switch__slider"> { theme ? <PiSun /> : <LuMoon />}</span>
          </label>
        </div>

      </div>

      <div className={`${isOpen ? "bg-opacity" : ""}`}>  {/* если isOpen то - класс menu-wrapper-active */}
        <div className={`menu-wrapper ${isOpen ? "menu-wrapper-active" : ""}`}>
          <p 
          className="discount-lable"
          onClick={() => setIsModalOpen(true)}
          >1 day discount!</p>
          <ul className="navbar__menu">
            <li>
              <NavLink to="/" className="mainpage">
                Main Page
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className="categories">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/allproducts" className="allproducts">
                All products
              </NavLink>
            </li>
            <li>
              <NavLink to="/allsales" className="allsalles">
                All sales
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar__icon-wrapper">
        
        <div className="navbar__icon-wrapper_item">
          <NavLink to="/favourites">
            <RiHeartFill className={`icon-favourite`}/>
          </NavLink>

          <div className={` ${favouritesNotEmpty ? 'icon-quaontity__wraper' : 'disabled'} `}>
            <p> { favourites && favourites.length } </p> 
          </div>
        </div>

        <div className="navbar__icon-wrapper_item">
          <NavLink to="/cart">
            <GiShoppingBag className='icon-cart' /> 
          </NavLink> 
          <div className={` ${cartNotEmpty ? 'icon-quaontity__wraper' : 'disabled'} `}>
            <p> { cart && cart.length } </p>  
          </div>
        </div>



        {/* если isOpen то класс burger-x */}
        <div
          className={`navbar__burger ${isOpen ? "burger-x" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      </nav>


      {
        isModalOpen && promoProduct &&
        <Modal>
          <div>
           </div>


            <div className="promo-pro" > 
              <div className="promo-pro__header"> 
                <h2>50% discount on product of the day!</h2> 
                <button className="close-button" onClick={() => setIsModalOpen(false)}>X</button> 
              </div> 

              <div className="promo-pro__info"> 
                <div className="product-image-container"> 
                <img src={`${apiUrl}/${promoProduct.image}`}alt={promoProduct.title} className="product-image"/>
                  <div className="product-info-overlay"> 
                    <span className="discount-badge">-50%</span> 
                    <RiHeartFill className={`icon-favourite ${isFavourite ? 'icon-favourite-active' : ''}`} onClick={handleAddToFavourite} /> 
                  </div> 
                  <div className="product-info"> 
                    <h3>{promoProduct.title}</h3> 
                    <div className="price-container"> 
                      <p className="price"> 
                      <span className="new-price">${promoProduct.discont_price}</span>
                      <span className="old-price">${promoProduct.price}</span>
                      </p> 
                    </div> 
                  </div> 
                </div> 
              </div> 

              <button
                className={`btn promo-pro__button ${addedToCart ? 'added' : ''}`}
                onClick={()=>handleAddToCart(promoProduct)}
                disabled={addedToCart}
              >
                {addedToCart ? 'Added' : 'Add to cart'}
              </button>

            </div> 
        </Modal> 
        }
    </>
  );
}

export default NavBar