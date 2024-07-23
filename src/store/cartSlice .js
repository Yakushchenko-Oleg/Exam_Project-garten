import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"


const URL = import.meta.env.APP_API_URL

export const fetchGetDiscount = createAsyncThunk(
  'cart/fetchGetDiscount',
  async function (formData, {rejectWithValue}) {

    console.log(formData, rejectWithValue)

    // try {
    //   const responce = await fetch(`${URL}/sale/send`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }, 
    //     body: JSON.stringify(formData)
    //   })
    //   console.log(responce, formData);
    //   if (!responce.ok) {
    //     throw new Error('Failed to send a discount request')      
    //     }  else {localStorage.setItem('discount', true)}
  
    // } catch (error) {
    //   return rejectWithValue(error.message)
    // }
  }
)
export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder',
   function (formData, {rejectWithValue}) {

    try {

      // fetch('https://exam-server-5c4e.onrender.com/order/send', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //    ...formData
      //   }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // })
      //   .then((response) => response.json())
        // .then((json) => console.log(json));

      const responese = fetch("https://exam-server-5c4e.onrender.com/order/send", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({...formData}) // не уверен что правильно передаю  cart
      }).then(res => res.json()).then(console.log)
      // console.log(responese, formData);


      // if (!responese.ok) {
      //   throw new Error('Failed to send an Order')      
      //   }  else {localStorage.removeItem('cart')} // стираем корзину в localStorage
  
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

      const event = new Event('cartUpdate'); // Создание и диспатчинг кастомного события
      window.dispatchEvent(event);
      },
      removeFromCart(state, {payload}) {
        state.cart = state.cart.filter(item => item.id !==payload.id)
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
        .addCase(fetchOrder.pending,(state) => {
          state.isLoading = true, 
          state.error = null
        })
        .addCase(fetchOrder.fulfilled, (state)  =>{
          state.isLoading = false,
          console.log(state)
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