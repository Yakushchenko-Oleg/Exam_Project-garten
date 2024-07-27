import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = import.meta.env.APP_API_URL;

export const fetchGetDiscount = createAsyncThunk(
  'cart/fetchGetDiscount',
  async function (formData, { rejectWithValue }) {

    try {
      const response = await fetch(`${URL}/sale/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      });

      if (!response.ok) {
        throw new Error('Failed to send an Order');
      }

      const data = await response.json();
      return data;

    } 
    catch (error) {
      console.error("fetchGetDiscount failed with error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder',
  async function (formData, { rejectWithValue }) {

    try {
      const response = await fetch(`${URL}/order/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      });

      if (!response.ok) {
        throw new Error('Failed to send an Order');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("fetchOrder failed with error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    discount: false,
    isLoading: false,
    error: null
  },
  reducers: {
    getCartFromLocalStorage(state) {
      let cartFromStorage = JSON.parse(localStorage.getItem('cart'));
      
      if (cartFromStorage) {
        state.cart = [...cartFromStorage];
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
      }
    },
    addToCart(state, action) {
      const { product, quantity } = action.payload;

      let findProduct = state.cart.find(item => item.id === product.id);
      if (findProduct) {
        state.cart = state.cart.map(item => {
          if (item.id === product.id) {
            item.quantity = quantity;
          }
          return item;
        });
      } else {
        state.cart.push({ ...product, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));

    },
    changeQuantity(state, action) {
      const { product, quantity } = action.payload;

      state.cart = state.cart.map(item => {
        if (item.id === product.id) {
          item.quantity = quantity;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, { payload }) {
      state.cart = state.cart.filter(item => item.id !== payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetDiscount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetDiscount.fulfilled, (state) => {
        state.isLoading = false;
        state.discount = true;
        localStorage.setItem('discount', true);
      })
      .addCase(fetchGetDiscount.rejected, (state, action) => {
        console.error("fetchGetDiscount rejected:", action.payload);
        state.isLoading = false;  // Используем `false` для завершения загрузки
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = [];  // Обнуляем корзину
        localStorage.removeItem('cart'); // Стираем корзину в localStorage после успешной отправки заказа
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        console.error("fetchOrder rejected:", action.payload);
        state.isLoading = false;  // Используем `false` для завершения загрузки
        state.error = action.payload;
      });
  }
});

export const {
  getCartFromLocalStorage,
  addToCart,
  changeQuantity,
  removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
