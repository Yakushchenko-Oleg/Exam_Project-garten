import React, { useState } from 'react'
import '../../App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  const [isOpen, setOpen] = useState()
  
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="./images/navbar/logo.png" />
        <img className="light" src="./images/navbar/mode=light.png"></img>
        <img className="dark" src="./images/navbar/mode=dark.png"></img>
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
        <NavLink className="navbar__icon-heart" to="#">
          <img src="./images/navbar/heart empty.png"></img>
        </NavLink>

        <NavLink to="/cart">
          <img
            className="navbar__icon-cart"
            src="./images/navbar/basket=empty.png"
          />
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