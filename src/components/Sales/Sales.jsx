import React, { useEffect } from 'react'
import '../../App.scss';
import "./Sales.scss";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../store/productSlice'
import SingleProduct from '../SingleProduct/SingleProduct'
import { Link } from 'react-router-dom'



const Sales = () => {

const {products, isLoading, error} = useSelector(state => state.recivedProducts.products)

const discoutProducts = products.filter(item => item.discont_price)

  
const dispatch = useDispatch()

useEffect(()=> {dispatch(fetchAllProducts())},[dispatch])

function mixArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const randomObj = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomObj]] = [array[randomObj], array[i]];
  }
  return array;
}


return (

  <div className="sales">
      <div className="sales__header-wrapper">
        <h2>Sale</h2>
        <div className="sales__line"></div>
        <Link to="/allsales">
          <span className="sales__link">All sales</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="sales__wrapper">
          {
            discoutProducts && mixArray(discoutProducts).slice(0,4).map(item =>
              <SingleProduct product={item} key={item.id}/>
            )
          }
        </div>
      )}
      {error && <h2> Error from server: {error} </h2>}

    <Link to="/allsales">
          <span className="sales__link sales__link-hidden">All sales</span>
    </Link>  
    
    </div>
  )
}
export default Sales

