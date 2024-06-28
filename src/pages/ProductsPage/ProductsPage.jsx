import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductsByCategory, fetchAllProducts, sortByPriceAction } from '../../store/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from '../../components/SingleProduct/SingleProduct';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { recivedProducts, filteredProducts, isLoading, error } = useSelector(
    (state) => state.products
  );
  const { data, category } = recivedProducts;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("All Products");

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        await dispatch(fetchProductsByCategory(categoryId));
      } else {
        await dispatch(fetchAllProducts());
      }
    };
    fetchData();
   }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId && category) {
      setCategoryTitle(category.title);
      setBreadcrumbs([
          { link: "/", 
            name: "Main page " 
          },
          { link: "/categories", 
            name: " Categories page " 
          },
          { link: `/categories/${categoryId}`, 
          name: category.title },
      ])
    } else {
      setCategoryTitle("All Products");
      setBreadcrumbs([
        { link: "/", name: "Main page " },
        { link: "/allproducts", name: " All products " }
      ])
    }
  }, [categoryId, category]);

  const handleSort = (event) =>{
    const value = event.target.value ;//userchoise
    let sorted = data;

    if(value === "low-to-high") {
      sorted = [ ...data].sort( (a,b)=> a.price -b.price);
    }else if(value === "high-to-low") {
      sorted = [ ...data].sort( (a,b)=> b.price -a.price);
    }

    dispatch(sortByPriceAction(sorted));
  }

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {
          breadcrumbs && breadcrumbs.map(item => 
          <span key={item.link}>
              <Link to={item.link}>{item.name}</Link> <span>-</span>
          </span>
         )
        }
      </div>

      <div className='filter__wrapper'>
        <div className="filter__item">
          <p>Sort</p>
          <select onChange={handleSort}>
              <option value="default">by default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products">
        <h2>{categoryTitle}</h2>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="wrapper">
           {
           filteredProducts &&
           filteredProducts.map((item) => (
                <Link to={`/products/${item.id}`} className="item__title" key={item.id}>
                  <SingleProduct product={item} />
                </Link>
              ))
            }
          </div>
        )}
        {error && <h2> Error from server: {error} </h2>}
      </div>
    </main>
  );
};

export default ProductsPage;
