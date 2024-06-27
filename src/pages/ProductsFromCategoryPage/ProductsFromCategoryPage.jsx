import React from 'react'
import { useParams } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";

{/* <div className="product-navigation">
      <Link to="/">
        <span className="link">Main page</span>
      </Link>
      <div className="line"></div>
      <Link to="/categories">
        <span className="link">Categories</span>
      </Link>
      <div className="line"></div>
      <Link to="/categories/:categoryId">
        <span className="link link-active">Chosen Category fgfhgf</span>
      </Link>
    </div>


@import '../../variables.scss';
@import '../../mixin.scss';

// .product-navigation - в App.scss
// все h2 перенести - в App.scss

.categories__wrapper{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-auto-rows: auto; 
    gap: 20px;
} */}


const ProductsFromCategoryPage = () => {
      // Отображение списка товаров в выбранной категории

  const breadcrumbs = useBreadcrumbs();

  const { categoryId } = useParams(); 

  return (
    <main className='maincontainer'> 
      <div className="maincontainer_breadcrumbs-container">
        here is breadcrumbs
      </div>
      <h2>Category Title</h2>

      {/* {
        isLoading ? (
          <div className="loader"></div>
        ) : ( 
          <div className="AllСategories__wrapper">
          {
            categories.map( item => (
              <Link to={`/categories/${item.id}`} className='item__title' key={item.id}>
                  <CategoriesItem item={item} apiUrl={apiUrl} key={item.id} />
              </Link>

              
            ))
          }
          </div>
        )
      }
      {error && <h2> Error from server: {error} </h2>} */}

    
    </main>

  
  )
}

export default ProductsFromCategoryPage
