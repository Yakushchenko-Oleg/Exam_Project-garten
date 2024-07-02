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
    filteredProducts: [],
    isLoading: false,
    error: null
    },
    reducers: {
      sortByPriceAction(state, action) {
        const { value } = action.payload;
        if (value === "low-to-high") {
          if(state.filteredProducts.length > 0) {
            state.filteredProducts = state.filteredProducts.sort((a, b) => a.price - b.price);
          }else { 
            state.filteredProducts = state.recivedProducts.data.sort((a, b) => a.price - b.price)
          }

        } else if (value === "high-to-low") {
          if(state.filteredProducts.length > 0) {
            state.filteredProducts = state.filteredProducts.sort((a, b) => b.price - a.price);
          }else { 
            state.filteredProducts = state.recivedProducts.data.sort((a, b) => b.price - a.price)
          }

        } else{
          state.filteredProducts = state.recivedProducts.data;
        }
      },
      sortByDiscountAction(state, action){
        const { applyDiscount } = action.payload;
        if (applyDiscount) {
          if(state.filteredProducts.length > 0) {
               state.filteredProducts = state.filteredProducts.filter(item => item.discont_price);
          } else {
            state.filteredProducts = state.recivedProducts.data.filter(item => item.discont_price);
          }
          
        } else {
          state.filteredProducts =  state.recivedProducts.data;
        } 
      },
      sortByUserPriceAction(state, action) {
       const { minValue, maxValue } = action.payload;
       if(state.filteredProducts.length > 0) {
          state.filteredProducts = state.filteredProducts.filter(item => item.price >= minValue && item.price <= maxValue);
       } else {
          state.filteredProducts = state.recivedProducts.data.filter(item => item.price >= minValue && item.price <= maxValue);
        }  
      }
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

export const {sortByPriceAction, 
              sortByDiscountAction,
              sortByUserPriceAction} = productsSlice.actions