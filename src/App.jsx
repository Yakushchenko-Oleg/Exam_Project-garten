import React, { useEffect } from 'react';
import './index.css';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import AllSalesPage from './pages/AllSalesPage/AllSalesPage.jsx';
import Error404 from './pages/ErrorPage/Error404.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Layout from './components/Layout.jsx';
import SingleProductsPage from './pages/SingleProductsPage/SingleProductsPage.jsx';
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx';
import ThemeProvider from './providers/ThemeProvider.jsx';
import { useDispatch } from 'react-redux';
import { fetchAllProducts } from './store/productSlice.js';
import { fetchAllCategoties } from './store/categoriesProductsSlice.js';
import { getCartFromLocalStorage, getfavouritessFromLocalStorage } from './store/cartSlice .js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategoties());
    dispatch(getCartFromLocalStorage());
    dispatch(getfavouritessFromLocalStorage())
  },[])


  return (
   
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/categories/:categoryId' element={<ProductsPage />} />
        <Route path='/allproducts' element={<ProductsPage />} />
        <Route path='/favourites' element={<ProductsPage />} />
        <Route path='/products/:id' element={<SingleProductsPage />} />
        <Route path='/allsales' element={<AllSalesPage />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    </Routes>

  );
};

export default App;
