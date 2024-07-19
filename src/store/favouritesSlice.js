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
      //сортировки 
      sortByPriceAction(state, action) {
        const { value } = action.payload;
        state.favourites = state.favourites.sort(
          value === "low-to-high" ? (a, b) => a.price - b.price
          : value === "high-to-low" ? (a, b) => b.price - a.price
          : (a, b) => a.id - b.id
        );
      },
      sortByDiscountAction(state, action) {
        const { applyDiscount } = action.payload;
        state.favourites = applyDiscount 
        ? state.favourites.filter(item => item.discont_price)
        : state.favourites;
      },
      sortByUserPriceAction(state, action) {
        const { minValue, maxValue } = action.payload;
        state.favourites = state.favourites.filter(item => item.price >= minValue && item.price <= maxValue);
      },
    }
  })

export const {
  getfavouritessFromLocalStorage,
  addTofavourites,
  removeFromfavourites,
  sortByPriceAction,
  sortByDiscountAction,
  sortByUserPriceAction

} = favouritesSlice.actions

export default favouritesSlice.reducer