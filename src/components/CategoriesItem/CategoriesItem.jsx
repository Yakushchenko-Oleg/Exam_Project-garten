import React from 'react'
import "./CategoriesItem.scss"
import { useParams } from 'react-router-dom';

const CategoriesItem = ( { item, apiUrl }) => {

  const { categoryId } = useParams(); // 


  return (
    <div className="categories__item">
      <img src={`${apiUrl}${item.image}`} alt={item.title} />
      <span>{item.title}</span>
    </div>
  );
};

export default CategoriesItem