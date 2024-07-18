import React, { useEffect } from "react";

import "./Categories.scss";
import { Link } from "react-router-dom";
import {useSelector } from 'react-redux';

import CategoriesItem from "../CategoriesItem/CategoriesItem";


const Categories = () => {
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );

  const slicedCategories = categories.slice(0, 4);

  const apiUrl = import.meta.env.APP_API_URL;

  return (
    <div className="products container-mainpage ">
      <div className="header-wrapper">
        <h2 className="categories-title">Categories</h2>
        <div className="categories__line"></div>
        <Link to="/categories">
          <span className="categories__link">All categories</span>
        </Link>
      </div>
      
        {
          isLoading ? (
            <div className="loader"></div>
          ) : ( 
            <div className="wrapper">
            {
              slicedCategories.map( item => (
                <Link to={`/categories/${item.id}`} className="item__link" key={item.id}>
                <CategoriesItem item={item} apiUrl={apiUrl} />
              </Link>
              ))
            }
            </div>
          )
        }
        {error && <h2> Error from server: {error} </h2>}

      <Link to="/categories">
        <span className="categories__link categories__link-hidden">All categories</span>
      </Link>  
      
    </div>
  );
};


export default Categories;
