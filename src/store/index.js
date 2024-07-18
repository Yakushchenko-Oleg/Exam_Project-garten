
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesProductsSlice from './categoriesProductsSlice';
import productsSlice from './productSlice';
import cartSlice from './cartSlice ';
import favouritesSlice from './favouritesSlice';


const rootReducer = combineReducers({
    products: productsSlice,
    categories: categoriesProductsSlice,
    cart: cartSlice,
    favourites: favouritesSlice,
})

export const store = configureStore({
    reducer: rootReducer

})