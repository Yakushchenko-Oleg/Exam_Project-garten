import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"


const URL = 'http://localhost:3333/categories/all' // ссылка на локальный сервер

export const fetchAllCategoties = createAsyncThunk(
  'categories/fetchAllCategoties',
  async function (_, ) {
    const resp = await fetch(URL)
    const data = await resp.json()

    return data
  }

)

const categoriesProductsSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        isLoading: false,
        error: null
          },
    reducers: {// заменить экшны на новые
        delLastProduct(state) {
        },
        sortByPriceAction(state) {

        }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAllCategoties.pending,(state) => {
        state.isLoading = true, 
        state.error = null
      })
      .addCase(fetchAllCategoties.fulfilled, (state, action)  =>{
        state.isLoading = false,
        state.categories = action.payload
      })
      // .addCase(fetchAllCategoties.rejected, (error) => {
      //   state.error = error } )
      
    }

})


export const {//заменить названия экшнов в экспорте
    delLastProduct,  
    sortByPriceAction
} = categoriesProductsSlice.actions

export default categoriesProductsSlice.reducer