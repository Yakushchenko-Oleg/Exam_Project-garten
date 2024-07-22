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
        // favourites: [],
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
      // getfavouritessFromLocalStorage(state){
      //   let favouritesFromStorage = JSON.parse(localStorage.getItem('favourites'))
      //   if (favouritesFromStorage) {
      //     state.favourites = [...favouritesFromStorage]
      //   } else{
      //     localStorage.setItem('favourites', JSON.stringify([]))
      //   }
      // },
      addToCart(state, action) {
        const {product, quantity} = action.payload
        let findProduct = state.cart.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве
       
        if (findProduct) {
          state.cart.map(item => { 
            // findProduct.quantity === quantity
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

      const event = new Event('cartUpdate'); // Создание и диспатчинг кастомного события
      window.dispatchEvent(event);
      },
      removeFromCart(state, {payload}) {
        state.cart = state.cart.filter(item => item.id !==payload.id)
        localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      // addTofavourites(state, action){
      //   const product = action.payload
      //   let findProduct = state.favourites.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве или null если его нет
       
      //   if (!findProduct) {
      //     state.favourites.push(product)
      //   }
      //   localStorage.setItem('favourites', JSON.stringify(state.favourites))
      // },
      // removeFromfavourites(state, action){
      //   const product = action.payload

      //   state.favourites = state.favourites.filter(item => item.id !==product.id)
      //   localStorage.setItem('favourites', JSON.stringify(state.favourites))
      // },

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
  getCartFromLocalStorage,
  // getfavouritessFromLocalStorage,
  addToCart,  
  changeQuantity,
  removeFromCart,
  // addTofavourites,
  // removeFromfavourites,

} = cartSlice.actions

export default cartSlice.reducer