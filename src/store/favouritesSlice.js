  import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"


const URL = import.meta.env.APP_API_URL



const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: [],
        },
    reducers: {
      getfavouritessFromLocalStorage(state){
        let favouritesFromStorage = JSON.parse(localStorage.getItem('favourites'))
        if (favouritesFromStorage) {
          state.favourites = [...favouritesFromStorage]
        } else{
          localStorage.setItem('favourites', JSON.stringify([]))
        }
      },
      addTofavourites(state, action){
        const product = action.payload
        let findProduct = state.favourites.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве или null если его нет
       
        if (!findProduct) {
          state.favourites.push(product)
        }
        localStorage.setItem('favourites', JSON.stringify(state.favourites))
      },
      removeFromfavourites(state, action){
        const product = action.payload

        state.favourites = state.favourites.filter(item => item.id !==product.id)
        localStorage.setItem('favourites', JSON.stringify(state.favourites))
      },

      extraReducers: (builder) => {
        // builder
        // .addCase(fetchGetDiscount.pending,(state) => {
        //   state.isLoading = true, 
        //   state.error = null
        // })
        // .addCase(fetchGetDiscount.fulfilled, (state)  =>{
        //   state.isLoading = false,
        //   state.discount = true
        // })
        // .addCase(fetchGetDiscount.rejected, (state, action) => {
        //   state.isLoading = null
        //   state.error = action.payload 
        // })
      }
    }
  })


export const {
  getfavouritessFromLocalStorage,
  addTofavourites,
  removeFromfavourites,

} = favouritesSlice.actions

export default favouritesSlice.reducer