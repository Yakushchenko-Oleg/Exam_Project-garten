import { createSlice } from "@reduxjs/toolkit"



const productsSlice = createSlice({
    name: 'products',
    initialState: {
            products: [ // временные данные, после подключения Thunk почистить этот массив
                {
                  "id": 1,
                  "title": "Savannah Summer Annual Collection",
                  "price": 53,
                  "discont_price": 50,
                  "description": "We love this fusion of colorful blossoms, created by combining some of the most floriferous and high performance annuals we know in our Savannah Summer Collection. Cherry-red Zinnia and sunrise-hued Lantana provide a perpetual fountain of flowers amidst the dark purple spiky foliage of Tradescantia.",
                  "image": "/product_img/1.jpeg",
                  "createdAt": "2022-10-02T14:43:29.000Z",
                  "updatedAt": "2022-10-02T14:43:29.000Z",
                  "categoryId": 1
                },
                {
                  "id": 2,
                  "title": "Angelonia angustifolia Archangel™ White",
                  "price": 10.75,
                  "discont_price": null,
                  "description": "Angelonia angustifolia Archangel™ White displays pristine white blossoms arranged on tall stems that sparkle above clean, glossy, dark green foliage. These sturdy, well-branched plants add texture and commanding presence to borders, containers, and flower arrangements.",
                  "image": "/product_img/2.jpeg",
                  "createdAt": "2022-10-02T14:43:29.000Z",
                  "updatedAt": "2022-10-02T14:43:29.000Z",
                  "categoryId": 1
                }
            ]
    },
    reducers: {
        delLastProduct(state) {// заменить экшны на новые

        },
        sortByPriceAction(state) {

        }
    }
})

export default productsSlice.reducer

export const { //заменить названия экшнов в экспорте
    delLastProduct, 
    sortByPriceAction
} = productsSlice.actions