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
        body: JSON.stringify(formData)
      })
      console.log(responce, formData);
      if (!responce.ok) {
        throw new Error('Failed to send a discount request')      
        }  else {localStorage.setItem('discount', true)}
  
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
    reducers: {
      addToCart(state, action) {
        const {product, quantity, selected} = action.payload
        let findProduct = state.cart.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве
        if (findProduct) {
          state.cart.map(item => { 
            // findProduct.quantity === quantity
            if (item.id === product.id) 
              { item.quantity === quantity  // в стейте не менфяется количество
            }
          } 
        )
        }
        else {
          state.cart.push({...product, quantity, selected})
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      changeQuantity(state, action) {
        const {product, quantity} = action.payload
        state.cart.map(item => {if (item.id === product.id){
          item.quantity === quantity
        } })
        localStorage.setItem('cart', JSON.stringify(state.cart))
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
    }
  })


export const {
    addToCart,  
    changeQuantity
} = cartSlice.actions

export default cartSlice.reducer