import React from 'react'
import './Error404.scss'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <main className='maincontainer'>

      <div className='containerError'>
        <img src="../../public/images/error/404.svg"></img>  
        <h2 className='error-title'>Page Not Found</h2>
        <p>We’re sorry, the page you requested could not be found.
        Please go back to the homepage
        </p>
        <Link to='/'>
        <button className='btn'> Go Home </button></Link>
      </div>
    </main>
  )
}

export default Error404