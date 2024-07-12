import React, { useContext, useState } from 'react'
import '../../App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'
import {ThemeContext} from '../../providers/ThemeProvider'

import { RiHeartFill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import { LuMoon, LuSunMedium } from 'react-icons/lu'
import { PiSun } from 'react-icons/pi'


const NavBar = () => {
  const [isOpen, setOpen] = useState();

  const {theme, toggleTheme} = useContext(ThemeContext);
  // const handleChangeSwitch = (e) => {
  //   toggleTheme(e.target.checked);
  // }
  
  return (
    <nav className={ `navbar ${theme ? 'navbar-dark' : 'navbar-light'} `}>
    
      <div className="navbar__logo">
        <img src="../../../public/images/navbar/logo.png" />
            
        <div className="nav__action" onClick={toggleTheme} >
                <label className={`switch ${theme ? "switch-active" : ""}`} for='checkbox'>
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
          {/* <img  className="navbar__icon-heart" src="../../../public/images/navbar/heart empty.png"></img> */}
          <RiHeartFill className='icon-favourite'/>
        </NavLink>

        <NavLink to="/cart">
          {/* <img
            className="navbar__icon-cart"
            src="../../../public/images/navbar/basket=empty.png"
          /> */}
          <GiShoppingBag className='icon-cart'/>
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