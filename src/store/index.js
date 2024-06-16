
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesProductsSlice from './categoriesProductsSlice';
import productsSlice from './productSlice';


const rootReducer = combineReducers({
    products: productsSlice,
    categories: categoriesProductsSlice

})

export const store = configureStore({
    reducer: rootReducer

})