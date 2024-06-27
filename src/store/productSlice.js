import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const URL = `${import.meta.env.APP_API_URL}`

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async function (_, {rejectWithValue}) {

    try {
      const resp = await fetch(`${URL}/products/all`)
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

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async function (categoryId, {rejectWithValue}) {

    try {
      const resp = await fetch(`${URL}/categories/${categoryId}`)
      if (!resp.ok) {
        throw new Error('Server Error')
      } 
      
      const data  = await resp.json()
      // console.log(data);
      return data



    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
    recivedProducts: {
      data: [],
      category: null
    },
    singleProduct: {},
    isLoading: false,
    error: null
    },
    reducers: {
      delLastProduct(state) {},// заменить экшны на новые      
      sortByPriceAction(state) { }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchAllProducts.pending,(state) => {
        state.isLoading = true, 
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action)  =>{
        state.isLoading = false,
        state.recivedProducts.data = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = null
        state.error = action.payload // Принимает payload (error.message) от rejectWithValue из блока catch
      })
      .addCase(fetchProductsByCategory.pending,(state) => {
        state.isLoading = true, 
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action)  =>{
        state.isLoading = false,
        state.recivedProducts = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = null
        state.error = action.payload // Принимает payload (error.message) от rejectWithValue из блока catch
      })

    }
})



export default productsSlice.reducer

export const { //заменить названия экшнов в экспорте
    delLastProduct, 
    sortByPriceAction
} = productsSlice.actions