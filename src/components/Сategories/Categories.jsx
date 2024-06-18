import React, { useEffect } from "react";
import '../../App.scss';
import "./Categories.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoties} from "../../store/categoriesProductsSlice";

// добавить полоску к all categories

const Categories = () => {

  const {categories, isLoading, error} = useSelector(state => state.categories)

  const slicedCategories = categories.slice(0,4)

  const apiUrl = import.meta.env.APP_API_URL

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
        isLoading ? <div className="loader"></div> 
        : slicedCategories.map( item =>        
          <div className="categories__item" key={item.id}>
            <img src={`${apiUrl}${item.image}`}></img> 
            {/* узнать как подставлять изображения с сервера и заменить путь */}
            {/* <img src={item.image}></img>  */}
            <span>{item.title}</span>
          </div>
        ) 
      }
      {
        error && <h2> Error from server: {error} </h2>
      }
      </div>
    </div>
  );
};

export default Categories;
