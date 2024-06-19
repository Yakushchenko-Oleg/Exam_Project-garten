import React, { useEffect } from 'react'
import '../../App.scss';
import "./Sales.scss";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../store/productSlice'
import SingleProduct from '../SingleProduct/SingleProduct'
import { Link } from 'react-router-dom'


const Sales = () => {

const {products, isLoading, error} = useSelector(state => state.products)

const discoutProducts = products.filter(item => item.discont_price)

const dispatch = useDispatch()

useEffect(()=> {dispatch(fetchAllProducts())},[dispatch])

function randomIndexInArray(array) {
   return Math.floor(Math.random() * array.length)
}

return (

  <div className="sales">
      <div className="sales__header-wrapper">
        <h2>Sale</h2>
        <div className="sales__header-wrapper_line"></div>
        <Link to="/allsales">
          <span className="sales__link">All sales</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="sales__wrapper">
          {/* <SingleProduct product={discoutProducts[randomIndexInArray(discoutProducts)]}/>
          <SingleProduct product={discoutProducts[randomIndexInArray(discoutProducts)]}/>
          <SingleProduct product={discoutProducts[randomIndexInArray(discoutProducts)]}/>
          <SingleProduct product={discoutProducts[randomIndexInArray(discoutProducts)]}/> */}
        </div>
      )}
      {error && <h2> Error from server: {error} </h2>}
    </div>
  )
}
export default Sales
