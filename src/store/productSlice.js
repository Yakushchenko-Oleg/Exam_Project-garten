import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const URL = `${import.meta.env.APP_API_URL}`

function mixArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const randomObj = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomObj]] = [array[randomObj], array[i]];
  }
  return array;
}

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
      return data

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState: {
    recivedProducts: {
      data: [],
      category: null,
    },
    singleProduct: {},
    promoProduct: {},
    promoDate: null,
    filteredProducts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    sortByPriceAction(state, action) {
      const { value } = action.payload;
      state.filteredProducts = 
      (state.filteredProducts.length > 0
          ? state.filteredProducts
          : [...state.recivedProducts.data]
      ).sort(
          value === "low-to-high" ? (a, b) => a.price - b.price
          : value === "high-to-low" ? (a, b) => b.price - a.price
          : (a, b) => a.id - b.id
        );
    },
    sortByDiscountAction(state, action) {
      const { applyDiscount } = action.payload;
      state.filteredProducts = 
      applyDiscount ? (
            state.filteredProducts.length > 0 
            ? state.filteredProducts.filter(item => item.discont_price) 
            : [...state.recivedProducts.data].filter(item => item.discont_price)
      ) : [...state.recivedProducts.data];
    },
    sortByUserPriceAction(state, action) {
      const { minValue, maxValue } = action.payload;
      state.filteredProducts = 
      (state.filteredProducts.length > 0 
          ? state.filteredProducts 
          : [...state.recivedProducts.data]
      ).filter(item => item.price >= minValue && item.price <= maxValue);
    },

    // getPromoProductFromLocalStorage(state){
    //   let promoProductFromStorage = JSON.parse(localStorage.getItem('promoProduct'))
      
    //   if (promoProductFromStorage) {
    //     state.promoProduct = promoProductFromStorage
    //   } else{
    //     const currentPromoProduct = mixArray(state.recivedProducts.data)[0]
    //     localStorage.setItem('promoProduct', JSON.stringify(currentPromoProduct))
    //   }
    // },
    // getPromoDateFromLocalStorage(state){
    //   let promoDateFromStorage = localStorage.getItem('promoDate')
      
    //   if (promoDateFromStorage) {
    //     state.promoDate = promoDateFromStorage
    //   } else{
    //     // localStorage.setItem('promoDate', JSON.stringify(null))
    //   }
    // },

    checkPromoProduct(state) {
      let promoDateFromStorage = JSON.parse(localStorage.getItem('promoDate')) 
      let promoProductFromStorage = JSON.parse(localStorage.getItem('promoProduct')) 
      const currentDate = new Date(new Date().setHours(0, 0, 0, 0)).toLocaleDateString() // возвращает текущую дату с временем 00 00 00 
      const currentPromoProduct = mixArray(state.recivedProducts.data)[0] // берет первый объект из прермешанного массива продуктов
    
      console.log('Текущая дата:', currentDate)
      console.log('Дата c Local Storage:', promoDateFromStorage)
      console.log('promoProduct c Local Storage:', promoProductFromStorage)
    
      if (promoProductFromStorage) {
        if (promoDateFromStorage !== currentDate) {
          console.log('PromoDate не совпадаеи, обнавляем PromoProduct.')
          state.promoDate = currentDate
          state.promoProduct = currentPromoProduct
          localStorage.setItem('promoDate', JSON.stringify(currentDate))
          localStorage.setItem('promoProduct', JSON.stringify(currentPromoProduct))
        }
      } else {
        console.log('PromoProduct не найден по этому обнавлен.')
        state.promoDate = currentDate
        state.promoProduct = currentPromoProduct
        localStorage.setItem('promoDate', JSON.stringify(currentDate))
        localStorage.setItem('promoProduct', JSON.stringify(currentPromoProduct))
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.recivedProducts.data = action.payload);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload; // Принимает payload (error.message) от rejectWithValue из блока catch
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        (state.isLoading = false), (state.recivedProducts = action.payload);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload; // Принимает payload (error.message) от rejectWithValue из блока catch
      });
  },
});



export default productsSlice.reducer

export const {sortByPriceAction, 
              sortByDiscountAction,
              sortByUserPriceAction,
              getPromoProductFromLocalStorage,
              checkPromoProduct} = productsSlice.actions