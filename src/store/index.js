
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesProductsSlice from './categoriesProductsSlice';
import prosuctsSlice from './productSlice';


const rootReducer = combineReducers({
    products: prosuctsSlice,
    categories: categoriesProductsSlice

})

export const store = configureStore({
    reducer: rootReducer

})