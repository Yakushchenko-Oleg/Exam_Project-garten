import React, { useContext } from 'react'
import NavBar from './Navbar/NavBar'
import Contacts from './Contacts/Contacts'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../providers/ThemeProvider'

const Layout = () => {
  
  const {theme} = useContext(ThemeContext);

  return (

    <div className={ `container-1440 ${theme ? 'container-1440-dark' : 'container-1440-light'}`}>
      <NavBar/>
        <Outlet/>
      <Contacts/> 
    </div>
  )
}

export default Layout
