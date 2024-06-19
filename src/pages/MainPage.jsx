import React from 'react'


// импрорт всех копмонентов  :
import Categories from '../components/Сategories/Categories'
import NavBar from '../components/Navbar/NavBar'
import Header from '../components/Header/Header'
import DiscountForm from '../components/DiscountForm/DiscountForm'
import Sales from '../components/Sales/Sales'
import Contacts from '../components/Contacts/Contacts'

const MainPage = () => {
  return (
    <div className='container-1440'> MainPage

      <NavBar />
      <Header />
      <main className='maincontainer'>
          <Categories />
          <DiscountForm />
          {/* <Sales /> */}
          <Contacts />
      </main>
     
    </div>
  )
}

export default MainPage