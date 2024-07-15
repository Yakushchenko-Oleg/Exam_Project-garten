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
        favorites: [],
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
      getfavoritessFromLocalStorage(state){
        let favoritesFromStorage = JSON.parse(localStorage.getItem('favorites'))
        if (favoritesFromStorage) {
          state.favorites = [...favoritesFromStorage]
        } else{
          localStorage.setItem('favorites', JSON.stringify([]))
        }
      },
      addToCart(state, action) {
        const {product, quantity} = action.payload
        let findProduct = state.cart.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве
       
        if (findProduct) {
          state.cart.map(item => { 
            // findProduct.quantity === quantity
            if (item.id === product.id) 
              { item.quantity === quantity  // в стейте не менфяется количество
            }
          return item
          })
        }
        else {
          state.cart.push({...product, quantity})
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))

        const event = new Event('cartUpdate'); // Создание и диспатчинг кастомного события
        window.dispatchEvent(event);
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
        state.cart = state.cart.filter(item => item.id !==payload)
        localStorage.setItem('cart', JSON.stringify(state.cart))

        const event = new Event('cartUpdate'); // Создание и диспатчинг кастомного события 
        window.dispatchEvent(event);
      },
      addToFavorites(state, action){
        const product = action.payload
        let findProduct = state.favorites.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве или null если его нет
       
        if (!findProduct) {
          state.favorites.push(product)
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      },
      removeFromFavorites(state, action){
        const product = action.payload
        state.favorites = state.favorites.filter(item => item.id !==product.id)
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
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
  getCartFromLocalStorage,
  getfavoritessFromLocalStorage,
  addToCart,  
  changeQuantity,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,

} = cartSlice.actions

export default cartSlice.reducer