// src/components/AllCategories/AllCategories.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoties } from "../../store/categoriesProductsSlice";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import Navigation from "../Navigation/Navigation";
import "./AllСategories.scss";

const AllCategories = () => {
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const apiUrl = import.meta.env.APP_API_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoties());
  }, [dispatch]);

  return (
    <div className="AllCategories">
      <Navigation currentPage="Categories" />
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
  );
};

export default AllCategories;

