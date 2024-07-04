import React, { useEffect, useState } from "react";
import "./ProductsPage.scss";
import { Link, useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  fetchAllProducts,
  sortByPriceAction,
  sortByDiscountAction,
  sortByUserPriceAction
} from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../../components/SingleProduct/SingleProduct.jsx";


const ProductsPage = () => {
  
  const dispatch = useDispatch();
  const { recivedProducts, filteredProducts, isLoading, error } = useSelector(
    (state) => state.products
  );
  const { data, category } = recivedProducts;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("All Products");

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId && category) {
      setCategoryTitle(category.title);
      setBreadcrumbs([
        { link: "/", name: "Main page " },
        { link: "/categories", name: " Categories page " },
        { link: `/categories/${categoryId}`, name: category.title },
      ]);
    } else {
      setCategoryTitle("All Products");
      setBreadcrumbs([
        { link: "/", name: "Main page " },
        { link: "/allproducts", name: " All products " },
      ]);
    }
  }, [categoryId, category]);

  //ф-ции для сортировки продуктов на странице
  const handleSort = (event) => {
    const userValue = event.target.value; //userchoise
    dispatch(sortByPriceAction({ value: userValue }));

    event.target.reset();
  };

  const handleUserPrice = (event) => {
    event.preventDefault(); // Останавливаем отправку формы

    let formData = new FormData(event.target.parentElement); //userInput
    let formObject = Object.fromEntries(formData);
    console.log(formObject);

    const minValue = formObject.from === "" ? -Infinity : +formObject.from;
    const maxValue = formObject.to === "" ? Infinity : +formObject.to;

    dispatch(sortByUserPriceAction({ minValue, maxValue }));

    event.target.reset();
  };

  const handleDiscountApply = (event) => {
    
    const userValue = event.target.checked; // apply checkbox
    // if(userValue){
    //   dispatch(sortByDiscountAction({ applyDiscount: userValue }));
    // }else{
    //   dispatch(sortByDiscountAction({ applyDiscount: userValue }));
    //   dispatch(handleSort);
    //   dispatch(handleUserPrice);
    dispatch(sortByDiscountAction({ applyDiscount: userValue }));
    
    // if (userValue) {
    //   dispatch(sortByDiscountAction({ applyDiscount: userValue }));
    // } 
    // else {
    //   resetFilters();
    // }
 };

//  const resetFilters = () => {
//   dispatch(fetchAllProducts()); // Очищаем фильтры = Загружаем все продукты заново
// };
 
  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {breadcrumbs &&
          breadcrumbs.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className="product-navigation__link"
            >
              {item.name}
            </Link>
          ))}
      </div>

      <div className="filter-wrapper">
        <form className="filter-wrapper__item" onChange={handleUserPrice}>
          <p className="filter-name">Price</p>
          <input className="userInput" type="number" placeholder="from" name="from"></input>
          <input className="userInput" type="number" placeholder="to" name="to"></input>
        </form>

        <div className="filter-wrapper__item">
          <p className="filter-name">Discounted items</p>
          <input
            className="checkbox"
            type="checkbox"
            onChange={handleDiscountApply}
          ></input>
        </div>

        <div className="filter-wrapper__item">
          <p className="filter-name">Sort</p>
          <select onChange={handleSort}>
            <option value="default">by default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products container">
        <div className="header-wrapper">
          <h2>{categoryTitle}</h2>
        </div>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="wrapper">
            {filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <Link
                    to={`/products/${item.id}`}
                    className="item__title"
                    key={item.id}
                  >
                    <SingleProduct product={item} />
                  </Link>
                ))
              : data.map((item) => (
                  <Link
                    to={`/products/${item.id}`}
                    className="item__title"
                    key={item.id}
                  >
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
