import React from 'react'

const CategoriesItem = ( { item, apiUrl }) => {
  return (
    <div className="categories__item" key={item.id}>
      <img src={`${apiUrl}${item.image}`} alt={item.title} />
      <span>{item.title}</span>
    </div>
  );
};

export default CategoriesItem