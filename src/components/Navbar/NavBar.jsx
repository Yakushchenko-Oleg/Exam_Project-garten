import React, { useContext, useState } from 'react'
import '../../App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'
import {ThemeContext} from '../../providers/ThemeProvider'
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";


const NavBar = () => {
  const [isOpen, setOpen] = useState();

  const {theme, toggleTheme} = useContext(ThemeContext);

  
  return (
    <nav className={ `navbar ${theme ? 'navbar-light' : 'navbar-dark'} `}>
    
      <div className="navbar__logo">
        <img src="../../../public/images/navbar/logo.png" />
        <img className="light" onClick={toggleTheme} src="../../../public/images/navbar/mode=light.png"></img>
        <img className="dark" src="../../../public/images/navbar/mode=dark.png"></img>
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
          <FaRegHeart className='icon-heart'/>
        </NavLink>

        <NavLink to="/cart">
          {/* <img
            className="navbar__icon-cart"
            src="../../../public/images/navbar/basket=empty.png"
          /> */}
          <HiOutlineShoppingBag className='icon-cart'/>
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