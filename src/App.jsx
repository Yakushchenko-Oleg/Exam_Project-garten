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
import Layout from './components/Layout.jsx'
import ProductsFromCategoryPage from './pages/ProductsFromCategoryPage.jsx'
import SingleProductsPage from './pages/SingleProductsPage.jsx'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/:categoryId' element={<ProductsFromCategoryPage/>} />
          <Route path='/allproducts' element={<AllProductsPage />} />
          <Route path='/products/:id' element={<SingleProductsPage />} />
          <Route path='/allsales' element={<AllSalesPage />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes> 
    </>

  )
}

export default App

