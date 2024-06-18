import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"


const URL = 'http://localhost:3333/categories/' // ссылка на локальный сервер
// const URL = 'https://exam-server-5c4e.onrender.com/' // ссылка на локальный сервер


export const fetchAllCategoties = createAsyncThunk(
  'categories/fetchAllCategoties',
  async function (_, {rejectWithValue}) {

    try {
      const resp = await fetch(`${URL}all`)
      if (!resp.ok) {
        throw new Error('Server Error')
      } 
      
      const data = await resp.json()
      return data

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProductsfromCategory = createAsyncThunk(
  'categories/fetchProductsfromCategory',
  async function(id, {rejectWithValue}) {

    try {
      const resp = await fetch(`${URL}${id}`)
      if (!resp.ok) {
        throw new Error('Cen`t get prouscts frpm this category')
      } 

      const products = resp.json()
      return products

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const categoriesProductsSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        productsFromCategory: {},
        isLoading: false,
        error: null
          },
    reducers: {// заменить экшны на новые
        firstReducer(state) {},
        secondReducer(state) {}
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchAllCategoties.pending,(state) => {
        state.isLoading = true, 
        state.error = null
      })
      .addCase(fetchAllCategoties.fulfilled, (state, action)  =>{
        state.isLoading = false,
        state.categories = action.payload
      })
      .addCase(fetchAllCategoties.rejected, (state, action) => {
        state.isLoading = null
        state.error = action.payload // Принимает payload (error.message) от rejectWithValue из блока catch
      })

      .addCase(fetchProductsfromCategory.pending,(state) => {
        state.isLoading = true, 
        state.error = null
      })
      .addCase(fetchProductsfromCategory.fulfilled, (state, action)  =>{
        state.isLoading = false,
        state.productsFromCategory = action.payload
      })
      .addCase(fetchProductsfromCategory.rejected, (state, action) => {
        state.isLoading = null 
        state.error = action.payload // Принимает payload (error.message) от rejectWithValue из блока catch
      })
    }

})


export const {//заменить названия экшнов в экспорте
    delLastProduct,  
    sortByPriceAction
} = categoriesProductsSlice.actions

export default categoriesProductsSlice.reducer