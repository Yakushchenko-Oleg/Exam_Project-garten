import React, { useEffect } from 'react'
import '../App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../src/store/productSlice';
import SingleProduct from '../components/SingleProduct/SingleProduct';
import { Link } from 'react-router-dom';


const AllProductsPage = () => {

  const {products, isLoading, error} = useSelector(state => state.products)

  const dispatch = useDispatch();

  useEffect(()=> 
    {dispatch(fetchAllProducts())
  }, [dispatch])
  console.log(products)

  return (
    <main className='maincontainer'> 
      <div className="product-navigation"> product navigation
      {/* <Link to="/">
          <span className="link">Main page</span>
      </Link>
      <div className="line"></div>
      <Link to="/categories">
          <span className="link">Categories</span>
      </Link>
      <div className="line"></div>
      <Link to={`/categories/${categoryId}`}>
          <span className="link link-active">Chosen Category</span>
      </Link> */}
      </div>

      <div className="products">
        <h2>All products</h2>

        {
          isLoading ? (
          <div className="loader"></div>
          ) : (
          <div className="wrapper">
            {
              products && products.map(item =>
                <SingleProduct product={item} key={item.id}/>
            )}
          </div>
        )}
        {error && <h2> Error from server: {error} </h2>}

         {/* <Link to="/allsales">
          <span className="sales__link sales__link-hidden">All sales</span>
    </Link>  */}

      </div>

    
    </main>
    
    
  )
}

export default AllProductsPage