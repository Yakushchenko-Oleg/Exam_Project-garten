import React, { useEffect } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoties} from "../../store/categoriesProductsSlice";



// добавить полоску к all categories


const Categories = () => {

  const {categories, isLoading, error} = useSelector(state => state.categories)

  const slicedCat = categories.slice(0,4)

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
        isLoading ? <h2>'Loadin...' </h2>
        : slicedCat.map( item =>        
          <div className="categories__item" key={item.id}>
            <img  src="../../../public/images/categories/img.svg"></img> {/* узнать как подставлять изображения с сервера и заменить путь */}
            <span>{item.title}</span>
          </div>
        ) 
      }
      {
        error &&  <h2> Error from server: {error} </h2>
      }
      </div>
    </div>
  );
};

export default Categories;
