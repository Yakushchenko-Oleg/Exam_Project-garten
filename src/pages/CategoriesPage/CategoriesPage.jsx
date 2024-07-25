import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";
import './CategoriesPage.scss'

const CategoriesPage = () => {
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const apiUrl = import.meta.env.APP_API_URL;

  const [breadcrumbs, setBreadcrumbs] = useState([
    { link: "/", name: "Main page " },
    { link: "/categories", name: " Categories page " }
  ]);
  const skeleton = [1, 2, 3, 4, 5];

  return (
    <main className="maincontainer">

      <div className="product-navigation">
        {breadcrumbs &&
          breadcrumbs.map((item) => (
              <Link key={item.link} to={item.link} className="product-navigation__link">{item.name}</Link> 
          ))}
      </div>

      <div className="AllCategories container">

        <div className="header-wrapper">
          <h2>Categories</h2>
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