import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = import.meta.env.APP_API_URL;

export const fetchGetDiscount = createAsyncThunk(
  'cart/fetchGetDiscount',
  async function (formData, { rejectWithValue }) {
    console.log("fetchGetDiscount started with formData:", formData);

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
      } else {
        localStorage.setItem('discount', true);
      }

      const data = await response.json();
      console.log("fetchGetDiscount succeeded with data:", data);
      return data;

    } catch (error) {
      console.error("fetchGetDiscount failed with error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder',
  async function (formData, { rejectWithValue }) {
    console.log("fetchOrder started with formData:", formData);

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
      } else {
        localStorage.removeItem('cart'); // Стираем корзину в localStorage
      }

      const data = await response.json();
      console.log("fetchOrder succeeded with data:", data);
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
      console.log("getCartFromLocalStorage:", cartFromStorage);
      
      if (cartFromStorage) {
        state.cart = [...cartFromStorage];
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
      }
    },
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      console.log("addToCart with product:", product, "and quantity:", quantity);

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
      console.log("Updated cart:", state.cart);
    },
    changeQuantity(state, action) {
      const { product, quantity } = action.payload;
      console.log("changeQuantity for product:", product, "to quantity:", quantity);

      state.cart = state.cart.map(item => {
        if (item.id === product.id) {
          item.quantity = quantity;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
      console.log("Cart after quantity change:", state.cart);
    },
    removeFromCart(state, { payload }) {
      console.log("removeFromCart with id:", payload.id);

      state.cart = state.cart.filter(item => item.id !== payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      console.log("Cart after removal:", state.cart);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetDiscount.pending, (state) => {
        console.log("fetchGetDiscount pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetDiscount.fulfilled, (state) => {
        console.log("fetchGetDiscount fulfilled");
        state.isLoading = false;
        state.discount = true;
      })
      .addCase(fetchGetDiscount.rejected, (state, action) => {
        console.error("fetchGetDiscount rejected:", action.payload);
        state.isLoading = false;  // Используем `false` для завершения загрузки
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        console.log("fetchOrder pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        console.log("fetchOrder fulfilled", "Action payload:", action.payload);
        state.isLoading = false;
        state.cart = [];  // Сбрасываем корзину
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
