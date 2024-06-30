import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";

import './CategoriesPage.scss'
import { fetchAllCategoties } from "../../store/categoriesProductsSlice";

const CategoriesPage = () => {
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const apiUrl = import.meta.env.APP_API_URL;
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([
    { link: "/", name: "Main page " },
    { link: "/categories", name: " Categories page " }
  ]);


  useEffect(() => {
    dispatch(fetchAllCategoties());
  }, [dispatch]);

  return (
    <main className="maincontainer">

<div className="product-navigation">
        {breadcrumbs &&
          breadcrumbs.map((item) => (
              <Link key={item.link} to={item.link} className="product-navigation__link">{item.name}</Link> 
          ))}
      </div>

      <div className="AllCategories">

        <div className="AllCategories__header-wrapper">
          <h2>Categories</h2>
        </div>
        
          {isLoading ? (
            <div className="loader"></div>
        ) : (
          <div className="AllCategories__wrapper">
            {categories.map(item => (
              <Link to={`/categories/${item.id}`} className="item__link" key={item.id}>
                <CategoriesItem item={item} apiUrl={apiUrl} />
              </Link>
            ))}
          </div>
        )}
        
        {error && <h2>Error from server: {error}</h2>}
      </div>
    </main>
  
  );
};


export default CategoriesPage