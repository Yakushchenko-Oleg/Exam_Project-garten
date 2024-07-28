import { createSlice } from "@reduxjs/toolkit"
const URL = import.meta.env.APP_API_URL

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
    filtredFavourites: [],
    },
  reducers: {
    getfavouritessFromLocalStorage(state){

      let favouritesFromStorage = JSON.parse(localStorage.getItem('favourites'))

      if (favouritesFromStorage) {
        state.favourites = [...favouritesFromStorage]
        state.filtredFavourites = state.favourites
      } else{
        localStorage.setItem('favourites', JSON.stringify([]))
      }
    },
    addTofavourites(state, action){

      const product = action.payload
      let findProduct = state.favourites.find(item => item.id === product.id) // получаем в переменную ссылку на объект в массиве или null если его нет
      
      if (!findProduct) {
        state.favourites.push(product)
        state.filtredFavourites = state.favourites
      }
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },
    removeFromfavourites(state, action){

      const product = action.payload

      state.favourites = state.favourites.filter(item => item.id !==product.id)
      state.filtredFavourites = state.favourites

      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },
    sortByPriceAction(state, action) {
      const { value } = action.payload;
      state.filtredFavourites .sort(
        value === "low-to-high" ? (a, b) => (a.discont_price ? a.discont_price : a.price) - (b.discont_price ? b.discont_price : b.price)
        : value === "high-to-low" ? (a, b) => (b.discont_price ? b.discont_price : b.price) - (a.discont_price ? a.discont_price : a.price)
        : (a, b) => a.id - b.id
      );
    },
    sortByDiscountAction(state, action) {
      const { applyDiscount } = action.payload;
      state.filtredFavourites = applyDiscount 
      ? (state.filtredFavourites.length > 0 
        ? state.filtredFavourites.filter(item => item.discont_price) 
        : [...favourites].filter(item => item.discont_price)
      ) 
      : [...favourites];
    },
    sortByUserPriceAction(state, action) {
      const { minValue, maxValue } = action.payload;
      state.filtredFavourites = state.favourites.filter(item => (item.discont_price ? item.discont_price : item.price) >= minValue && (item.discont_price ? item.discont_price : item.price) <= maxValue);
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