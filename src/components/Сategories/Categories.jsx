import React, { useEffect } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoties } from "../../store/categoriesProductsSlice";



// добавить полоску к all categories


const Categories = () => {

  const categories = useSelector(state => state.categories)
  const slicedCat = categories.categories.slice(0,4)
  const dispatch = useDispatch()


    useEffect(()=> {
      dispatch(fetchAllCategoties())
    },[dispatch])

  return (
    <div className="categories">
      <div className="categories__header-wrapper">
        <h2>Categories</h2>
        <Link to="/categories">
          <span className="categories__link">All categories</span>
        </Link>
      </div>

      <div className="categories__wrapper">
      {
        categories.isLoading ? 'Loadin...' 
        : slicedCat.map( item => 
          
        <div className="categories__item" key={item.id}>
          <img  src="../../../public/images/categories/img.svg"></img>
          <span>{item.title}</span>
        </div>
  
      
        ) 
      }
      </div>
    </div>
  );
};

export default Categories;
