import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductsByCategory, fetchAllProducts } from '../../store/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from '../../components/SingleProduct/SingleProduct';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { recivedProducts, isLoading, error } = useSelector(
    (state) => state.products
  );
  const { data, category } = recivedProducts;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("All Products");

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        await dispatch(fetchProductsByCategory(categoryId));
      } else {
        await dispatch(fetchAllProducts());
      }
    };
    fetchData();
   }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId && category) {
      setCategoryTitle(category.title);
      setBreadcrumbs([
          { link: "/", 
            name: "Main page " 
          },
          { link: "/categories", 
            name: " Categories page " 
          },
          { link: `/categories/${categoryId}`, 
          name: category.title },
      ])
    } else {
      setCategoryTitle("All Products");
      setBreadcrumbs([
        { link: "/", name: "Main page " },
        { link: "/allproducts", name: " All products " }
      ])
    }
  }, [categoryId, category]);

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {
          breadcrumbs && breadcrumbs.map(item => 
          <>
            <Link key={item.link} to={item.link}>{item.name}</Link> <span>-</span>
          </>)
        }
      </div>

      <div className="products">
        <h2>{categoryTitle}</h2>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="wrapper">
            {data &&
              data.map((item) => (
                <Link to={`/products/${item.id}`} className="item__title" key={item.id}>
                  <SingleProduct product={item} />
                </Link>
              ))}
          </div>
        )}
        {error && <h2> Error from server: {error} </h2>}
      </div>
    </main>
  );
};

export default ProductsPage;

// // наши ошибки

// Неиспользование dispatch для вызова fetchProductsByCategory и fetchAllProducts в компоненте.
// Ошибки в обработке состояния в productsSlice.
// Некорректное обращение к recivedProducts в компоненте.