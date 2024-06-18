import { createSlice } from "@reduxjs/toolkit"

const URL = `${import.meta.env.APP_API_URL}/categories/`


const productsSlice = createSlice({
    name: 'products',
    initialState: {
            products: []
    },
    reducers: {
        delLastProduct(state) {// заменить экшны на новые

        },
        sortByPriceAction(state) {

        }
    }
})

export default productsSlice.reducer

export const { //заменить названия экшнов в экспорте
    delLastProduct, 
    sortByPriceAction
} = productsSlice.actions