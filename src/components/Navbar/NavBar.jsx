import React from 'react'
import '../../App.scss'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  return (
    <div className='navbar'>
      
      <div className='navbar__logo' >
        <img src='../../../public/images/navbar/logo.png' />
      </div>
      
      <ul className='navbar__menu'>
        <li><NavLink to="/" className='mainpage'>Main Page</NavLink></li>
        <li><NavLink to="/categories" className='categories'>Categories</NavLink></li>
        <li><NavLink to="/allproducts" className='allproducts'>All products</NavLink></li>
        <li><NavLink to="/allsales" className='allsalles'>All sales</NavLink></li>
      </ul>

      <div className='navbar__icon-cart'>
        <NavLink to="/cart"><img className='navbar__icon-cart' src='../../../public/images/navbar/Vector.png'/></NavLink> 
      </div>
    
    </div>
  )
}

export default NavBar