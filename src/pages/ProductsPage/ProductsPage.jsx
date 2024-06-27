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
  // const [breadcrumbs, setBreadcrumbs] = useState([]);

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
    // setBreadcrumbs([
    //     {
    //         link: "/",
    //         name: "Main page"
    //     },
    //     {
    //         link: "/categories",
    //         name: "Categories page"
    //     },
    //     {
    //         link: `/categories/${category.id}`,
    //         name: category.title
    //     }
    // ])

    // setTitle(category.title)
    // }
    // catch(err){
    //    console.log(err);
    // }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId && category) {
      setCategoryTitle(category.title);
    } else {
      setCategoryTitle("All Products");
    }
  }, [categoryId, category]);

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {" "}
        product navigation
        {/* <Link to="/">
          <span className="link">Main page</span>
      </Link>
      <div className="line"></div>
      <Link to="/categories">
          <span className="link">Categories</span>
      </Link>
      <div className="line"></div>
      <Link to={`/categories/${categoryId}`}>
          <span className="link link-active">Chosen Category</span>
      </Link> */}
        {/* или  */}
        {/* <div>
        {
            breadcrumbs && breadcrumbs.map(item => <><Link key={item.link} to={item.link}>{item.name}</Link> / </>)
        }
    </div> */}
      </div>

      <div className="products">
        <h2>{categoryTitle}</h2>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="wrapper">
            {data &&
              data.map((item) => (
                <Link to={`/products/${item.id}`} className="item__title">
                  <SingleProduct product={item} key={item.id} />
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