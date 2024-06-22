import React from 'react'
import "./CategoriesItem.scss"

const CategoriesItem = ( { item, apiUrl }) => {

  return (
    <div className="categories__item">
      <img src={`${apiUrl}${item.image}`} alt={item.title} />
      <span>{item.title}</span>
    </div>
  );
};

export default CategoriesItem