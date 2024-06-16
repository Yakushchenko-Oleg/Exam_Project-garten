import React from 'react'
// import './App.scss'

// импрорт всех копмонентов  :
import Categories from '../components/Сategories/Categories'
import NavBar from '../components/Navbar/NavBar'

const MainPage = () => {
  return (
    <div> MainPage
      <NavBar />
      
      <Categories />
      
    </div>
  )
}

export default MainPage