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

const productsSlice = createSlice({
    name: 'products',
    initialState: {
    products: [],
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
        state.products = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
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