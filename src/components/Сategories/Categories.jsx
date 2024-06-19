import React, { useEffect } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoties} from "../../store/categoriesProductsSlice";
import CategoriesItem from "./CategoriesItem";



// добавить полоску к all categories


const Categories = () => {
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );

  const slicedCategories = categories.slice(0, 4);

  const apiUrl = import.meta.env.APP_API_URL;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoties());
  }, [dispatch]);
  console.log(import.meta.env);

  return (
    <div className="categories">
      <div className="categories__header-wrapper">
        <h2>Categories</h2>
        <Link to="/categories">
          <span className="categories__link">All categories</span>
        </Link>
      </div>
      
        {isLoading ? (
          <div className="loader"></div>
        ) : ( 
          <div className="categories__wrapper">
          {slicedCategories.map( item => (
            <CategoriesItem item={item} apiUrl={apiUrl} key={item.id} />
          ))}
          </div>
        )}
        {error && <h2> Error from server: {error} </h2>}
      
    </div>
  );
};

export default Categories;
