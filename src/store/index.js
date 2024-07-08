
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesProductsSlice from './categoriesProductsSlice';
import productsSlice from './productSlice';
import cartSlice from './cartSlice ';


const rootReducer = combineReducers({
    products: productsSlice,
    categories: categoriesProductsSlice,
    cart: cartSlice,
})

export const store = configureStore({
    reducer: rootReducer

})