import React from 'react';
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

const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/categories/:categoryId' element={<ProductsPage />} />
        <Route path='/allproducts' element={<ProductsPage />} />
        <Route path='/products/:id' element={<SingleProductsPage />} />
        <Route path='/allsales' element={<AllSalesPage />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    </Routes>

  );
};

export default App;
