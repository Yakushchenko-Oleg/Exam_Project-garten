import React, { useContext, useEffect, useState } from 'react'
import '@/App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'
import {ThemeContext} from '@/providers/ThemeProvider'

import { RiHeartFill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import { LuMoon, LuSunMedium } from 'react-icons/lu'
import { PiSun } from 'react-icons/pi'
import { useSelector } from 'react-redux'


const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const[cartNotEmpty, setCartNotEmpty] = useState(false); 
  const[favouritesNotEmpty, setFavouritesNotEmpty] = useState(false); 
  const {cart, favourites} = useSelector(state => state.cart);
  const {theme, toggleTheme} = useContext(ThemeContext);

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

  const handleFavouriteClick = () => {
    // setIsFavourite(!isFavourite);
  };
  
  
  return (
    <nav className={ `navbar ${theme ? 'navbar-dark' : 'navbar-light'}  `}>
    
      <div className="navbar__logo">
        <img src="@/../public/images/navbar/logo.png" />
            
        <div className="nav__action" onClick={toggleTheme} >
          <label className={`switch ${theme ? "switch-active" : ""}`} htmlFor='checkbox'>
            <input className='switch__input' type='checkbox' name='checkbox' ></input>
              <span className="switch__slider"> { theme ? <PiSun /> : <LuMoon />}</span>
          </label>
        </div>

      </div>

      {/* если isOpen то - класс menu-wrapper-active */}
      <div className={`${isOpen ? "bg-opacity" : ""} ${isModal ? 'bg-opacity': ''}`}>
        <div className={`menu-wrapper ${isOpen ? "menu-wrapper-active" : ""}`}>
          <p 
          className="discount-lable"
          onClick={() => setModal(!isModal)}
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
        <div className={` ${isModal ? 'modal-item': 'disabled'} `} >

          <div>Вставитиь компонент modal-item</div>

        </div>
      </div>
      <div className="navbar__icon-wrapper">
        
        <div className="navbar__icon-wrapper_item">
          <NavLink to="#">
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
  );
}

export default NavBar