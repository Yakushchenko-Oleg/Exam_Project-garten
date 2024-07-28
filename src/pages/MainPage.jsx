import React from 'react';
import '../App.scss';
import Header from '../components/Header/Header';
import Categories from '../components/Сategories/Categories';
import DiscountForm from '../components/DiscountForm/DiscountForm';
import Sales from '../components/Sales/Sales';


const MainPage = () => {
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

export default MainPage