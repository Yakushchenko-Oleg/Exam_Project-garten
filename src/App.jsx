import React from 'react'
<<<<<<< HEAD

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
=======
import './App.css'

const App = () => {
  return (
    <div>
      Exam project
    </div>
>>>>>>> 85e2d2e940c2955535f57faa0d13440d453a5ae0
  )
}

export default App

