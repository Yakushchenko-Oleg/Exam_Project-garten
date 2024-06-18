import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  return (
    <nav className='navbar'>
      
      <div className='navbar__logo' >
        <img src='./images/navbar/logo.png' />
      </div>
      
      <ul className='navbar__menu'>
        <li><NavLink to="/" className='mainpage'>Main Page</NavLink></li>
        <li><NavLink to="/categories" className='categories'>Categories</NavLink></li>
        <li><NavLink to="/allproducts" className='allproducts'>All products</NavLink></li>
        <li><NavLink to="/allsales" className='allsalles'>All sales</NavLink></li>
      </ul>

      <div className='navbar__icon-cart'>
        <NavLink to="/cart"><img className='navbar__icon-cart' src='./images/navbar/Vector.png'/></NavLink> 
      </div>

      <div className='burger'>
        <span></span>
        <span></span>
        <span></span>
      </div>

    
    </nav>
  )
}

export default NavBar