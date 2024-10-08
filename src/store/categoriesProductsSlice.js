import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"
const URL = import.meta.env.APP_API_URL

export const fetchAllCategoties = createAsyncThunk(
  'categories/fetchAllCategoties',
  async function (_, {rejectWithValue}) {

    try {
      const resp = await fetch(`${URL}/categories/all`)
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
  async function(categoryId, {rejectWithValue}) {

    try {
      const resp = await fetch(`${URL}${categoryId}`)
      if (!resp.ok) {
        throw new Error('Cen`t get prouscts from this category')
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
    productsByCategory: {},
    isLoading: false,
    error: null
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

export default categoriesProductsSlice.reducer