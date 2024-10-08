import React, { useEffect } from 'react'
import '../../App.scss';
import "./Sales.scss";
import { useSelector } from 'react-redux'
import SingleProduct from '../SingleProduct/SingleProduct'
import { Link } from 'react-router-dom'

const Sales = () => {

const {recivedProducts  = { data: [] }, isLoading, error} = useSelector(state => state.products)
const discoutProducts = recivedProducts.data.filter(item => item.discont_price)

function mixArray(array) {

  for (let i = array.length - 1; i > 0; i--) {
      const randomObj = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomObj]] = [array[randomObj], array[i]];
  }
  return array;
}

const skeleton = [1, 2, 3, 4]; // массив для отрисовки скелетона

return (

  <div className="products container-mainpage">
      <div className="header-wrapper">
        <h2>Sale</h2>
        <div className="sales__line"></div>
        <Link to="/allsales">
          <span className="sales__link">All sales</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="wrapper">
        {skeleton.map((item) => (
          <div className="loader" key={item}></div>
        ))
        }
      </div>
      ) : (
        <div className="wrapper">
          {
            discoutProducts && mixArray(discoutProducts).slice(0,4).map(item =>
              <SingleProduct key={item.id} product={item}/>
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

