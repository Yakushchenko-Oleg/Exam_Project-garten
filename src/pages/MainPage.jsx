import React from 'react'
import '../App.scss'

// импрорт всех копмонентов  :
import Categories from '../components/Сategories/Categories'
import NavBar from '../components/Navbar/NavBar'
import Header from '../components/Header/Header'

const MainPage = () => {
  return (
    <div> MainPage
      <NavBar />
      <Header />
      <main className='maincontainer'>
          <Categories />
      </main>
    
      
    </div>
  )
}

export default MainPage