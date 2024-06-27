import React, { useEffect } from "react";

import "./AllСategories.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoties} from "../../store/categoriesProductsSlice";
import CategoriesItem from "../CategoriesItem/CategoriesItem";

// добавить полоску к all categories

const AllСategories = () => {
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );
  const apiUrl = import.meta.env.APP_API_URL;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoties());
  }, [dispatch]);

  return (
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
  );
};
export default AllСategories;
