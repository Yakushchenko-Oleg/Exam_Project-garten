import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../store/productSlice'


const Sales = () => {

const {products} = useSelector(state => state.products)

const dispatch = useDispatch()

useEffect(()=> {dispatch(fetchAllProducts())},[dispatch])

function randomIndexInArray(array) {
   return Math.floor(Math.random() * array.length)
}

// console.log(products);
// console.log(randomIndexInArray(products));

return (
    <div>
        {/* <SingleProduct product={products[randomIndexInArray(products)]}/>
        <SingleProduct product={products[randomIndexInArray(products)]}/>
        <SingleProduct product={products[randomIndexInArray(products)]}/>
        <SingleProduct product={products[randomIndexInArray(products)]}/>
        <div>
            <h2>{product.title}</h2>

        </div>
       */}
    </div>

export default Sales
