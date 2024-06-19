import React from 'react'
import './index.css'
import './App.scss'
import { Route, Routes } from 'react-router-dom'

import MainPage from './pages/MainPage.jsx' 
import CategoriesPage from './pages/CategoriesPage.jsx' 
import AllProductsPage from './pages/AllProductsPage.jsx' 
import AllSalesPage from './pages/AllSalesPage.jsx' 
import Error404 from './pages/Error404.jsx' 
import Cart from './pages/Cart.jsx' 


const App = () => {
  return (
    <>
      <Routes>

            <Route index element={<MainPage />} />
            {/* <Route path='/' element={<MainPage />} /> */}
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/allproducts' element={<AllProductsPage />} />
            <Route path='/allsales' element={<AllSalesPage />} />
            <Route path='*' element={<Error404 />} />
            <Route path='/cart' element={<Cart />} />

      </Routes> 
    </>

  )
}

export default App

