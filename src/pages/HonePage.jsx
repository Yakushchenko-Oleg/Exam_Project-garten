import React from 'react'

import Header from '../components/Header/Header'
import Categories from '../components/Сategories/Categories'


const HonePage = () => {
  return (
    <>
        <Header />
        <main className='maincontainer'>  
            <Categories />
            <DiscountForm />
            <Sales />
        </main>
        
    
    </>
  )
}

export default HonePage
