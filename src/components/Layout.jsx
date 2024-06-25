import React from 'react'
import NavBar from './Navbar/NavBar'
import Contacts from './Contacts/Contacts'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (


    <div className='container-1440'>
        <NavBar/>
        
            <Outlet/>

        <Contacts/> 
    </div>
  )
}

export default Layout
