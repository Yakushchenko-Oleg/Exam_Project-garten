import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

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

    checkPromoProduct(state) {
      let promoDateFromStorage = JSON.parse(localStorage.getItem('promoDate')) 
      let promoProductFromStorage = JSON.parse(localStorage.getItem('promoProduct')) 
      const currentDate = new Date(new Date().setHours(0, 0, 0, 0)).toLocaleDateString() // возвращает текущую дату в виде строки
      const rundomProduct = mixArray([...state.recivedProducts?.data])[0] // берет первый объект из прермешанного массива продуктов,
      const currentPromoProduct =  {
        ...rundomProduct, 
        id: uuidv4(), 
        discont_price: +(rundomProduct?.price * 0.5).toFixed(2)
      }  // меняем id и цену со скидкой округляя ее до двух знаков, с помощью + переводим ы число т.к метод toFixed преводит данные в строку 
            
      if (promoProductFromStorage) {
        if (promoDateFromStorage !== currentDate) {
          console.log('PromoDate не совпадают, обнавляем PromoProduct и promoDate.')
          state.promoDate = currentDate
          state.promoProduct = currentPromoProduct
          localStorage.setItem('promoDate', JSON.stringify(currentDate))
          localStorage.setItem('promoProduct', JSON.stringify(currentPromoProduct))
        } 
      } else {
        console.log('PromoProduct не найден по этому обнавлен на:', currentPromoProduct)
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
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.recivedProducts.data = action.payload // обновляем массив продуктов в состоянии

        // Обновляем promoProduct 
        let promoProductFromStorage = JSON.parse(localStorage.getItem('promoProduct')) 
        let promoDateFromStorage = JSON.parse(localStorage.getItem('promoDate')) 

        if (promoProductFromStorage) {
          state.promoProduct = promoProductFromStorage
          state.promoDate = promoDateFromStorage

        }
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload; // Принимает payload (error.message) от rejectWithValue из блока catch
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.recivedProducts = action.payload
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