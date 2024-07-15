import React, { useContext, useState } from 'react'
import '@/App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'
import {ThemeContext} from '@/providers/ThemeProvider'

import { RiHeartFill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import { LuMoon, LuSunMedium } from 'react-icons/lu'
import { PiSun } from 'react-icons/pi'


const NavBar = () => {
  const [isOpen, setOpen] = useState();

  const {theme, toggleTheme} = useContext(ThemeContext);

  // при нажатии на иконку,устанавливается класс active
  const [isFavourite, setIsFavourite] = useState(false);
  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite);
  };
  
  
  return (
    <nav className={ `navbar ${theme ? 'navbar-dark' : 'navbar-light'} `}>
    
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
      <div className={`${isOpen ? "bg-opacity" : ""}`}>
        <div className={`menu-wrapper ${isOpen ? "menu-wrapper-active" : ""}`}>
          <p className="discount-lable">1 day discount!</p>
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
        <NavLink to="#">
        <RiHeartFill
          className={`icon-favourite ${isFavourite ? 'icon-favourite-active' : ''}`}
          onClick={handleFavouriteClick}
        />
        </NavLink>

        <NavLink to="/cart">
        <GiShoppingBag className='icon-cart' />
        </NavLink>

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