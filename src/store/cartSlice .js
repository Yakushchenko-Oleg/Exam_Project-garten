import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"


const URL = import.meta.env.APP_API_URL

export const fetchGetDiscount = createAsyncThunk(
  'cart/fetchGetDiscount',
  async function (formData, {rejectWithValue}) {

    try {
      const responce = await fetch(`${URL}/sale/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({...formData, id: uuidv4()}),
      })
      
      if (!responce.ok) {
        throw new Error('Failed to send a discount request')      
        }  else {localStorage.setItem('discount', true)}

      const data = await responce.json()

      return data
      
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        discount: false,
        isLoading: false,
        error: null
          },
    reducers: {// заменить экшны на новые
      firstReducer(state) {},
      secondReducer(state) {}
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchGetDiscount.pending,(state) => {
        state.isLoading = true, 
        state.error = null
      })
      .addCase(fetchGetDiscount.fulfilled, (state)  =>{
        state.isLoading = false,
        state.discount = true
      })
      .addCase(fetchGetDiscount.rejected, (state, action) => {
        state.isLoading = null
        state.error = action.payload 
      })
    }

})


export const {//заменить названия экшнов в экспорте
    delLastProduct,  
    sortByPriceAction
} = cartSlice.actions

export default cartSlice.reducer