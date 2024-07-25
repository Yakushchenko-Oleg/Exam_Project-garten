import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"


const URL = import.meta.env.APP_API_URL

export const fetchGetDiscount = createAsyncThunk(
  'cart/fetchGetDiscount',
  async function (formData, {rejectWithValue}) {

    console.log(formData, rejectWithValue)

 
     try {
      const responese = await fetch(`${URL}/sale/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({...formData})
      })
         
      if (!responese.ok) {
        throw new Error('Failed to send an Order')      
        } else{
          localStorage.setItem('discount', true)
        }

        const data = await responese.json()

        return data 
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder',
   async function (formData, {rejectWithValue}) {

    try {
      const responese = await fetch(`${URL}/order/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({...formData})
      })
        
      
      
      if (!responese.ok) {
        throw new Error('Failed to send an Order')      
        } else{
          localStorage.removeItem('cart') // стираем корзину в localStorage
        }

        const data = await responese.json()

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
    reducers: {
      getCartFromLocalStorage(state){
        let cartFromStorage = JSON.parse(localStorage.getItem('cart'))
        
        if (cartFromStorage) {
          state.cart = [...cartFromStorage]
        } else{
          localStorage.setItem('cart', JSON.stringify([]))
        }
      },
      addToCart(state, action) {
        const {product, quantity} = action.payload
        let findProduct = state.cart.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве
       
        if (findProduct) {
          state.cart.map(item => { 
            if (item.id === product.id) 
              { item.quantity = quantity  
            }
          return item
          })
        }
        else {
          state.cart.push({...product, quantity})
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      changeQuantity(state, action) {
        const {product, quantity} = action.payload
        
        state.cart.map(item => {
          if (item.id === product.id){
          item.quantity = quantity
          } 
        return item 
        })

        localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      removeFromCart(state, {payload}) {
        state.cart = state.cart.filter(item => item.id !==payload.id)
        localStorage.setItem('cart', JSON.stringify(state.cart))
      },

      extraReducers: (builder) => {
        builder // не работают кейсы
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

        .addCase(fetchOrder.pending,(state) => {
          state.isLoading = true, 
          state.error = null
        })
        .addCase(fetchOrder.fulfilled, (state)  =>{
          state.isLoading = false,
          state.cart = [] // не обнуляется корзтна в стейте
          console.log(action.payload);

        })
        .addCase(fetchOrder.rejected, (state, action) => {
          state.isLoading = null
          state.error = action.payload 
        })
      }
    }
  })


export const {
  getCartFromLocalStorage,
  addToCart,  
  changeQuantity,
  removeFromCart,
} = cartSlice.actions

export default cartSlice.reducer