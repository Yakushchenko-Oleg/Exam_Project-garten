import React from 'react'
import './Categories.scss'

// добавить полоску к all categories
// сделать all categories Link 

const Categories= () => {
  return (
    <div className='categories'>
      <div className='categories__header-wrapper'>
        <h2>Categories</h2> 
        <span className='categories__link'>All categories</span>
      </div>
      

      <div className='categories__wrapper'>
          <div className='categories__item'>
            <img src="../../../public/images/categories/img.svg"></img>
            <span>Fertilizer</span>
          </div>

          <div className='categories__item'>
            <img src='../../../public/images/categories/img.png'/>
            <span>Protective products and septic tanks</span>
          </div>

          <div className='categories__item'>
            <img src='../../../public/images/categories/img (1).png'/>
            <span>Planting material	</span>
          </div>

          <div className='categories__item'>
            <img src='../../../public/images/categories/img (2).png'/>
            <span>Tools and equipment</span>
          </div>
      </div>

    </div>
  )
}

export default Categories