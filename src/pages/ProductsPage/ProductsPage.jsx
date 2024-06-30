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
import SingleProduct from "../../components/SingleProduct/SingleProduct";

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
    const value = event.target.value; //userchoise
    let sorted = data;

    if (value === "low-to-high") {
      sorted = [...data].sort((a, b) => a.price - b.price);
    } else if (value === "high-to-low") {
      sorted = [...data].sort((a, b) => b.price - a.price);
    }

    dispatch(sortByPriceAction(sorted));
  };

  const handleDiscountApply = (event) => {
    const value = event.target.checked; // checkbox
    let discounted = data;

    if (value) {
    discounted = data.filter(item => item.discont_price);
    } else {
      discounted = data;
    }

    dispatch(sortByDiscountAction(discounted));
  };

  const handleUserPrice = (event) => {
    event.preventDefault(); // Останавливаем отправку формы

    let formData = new FormData(event.target.parentElement)
    let formObject  = Object.fromEntries(formData)
    console.log(formObject)
    
    const minValue = formObject.from === '' ? -Infinity : +(formObject.from );
    const maxValue = formObject.to === '' ? Infinity : +(formObject.to);

    const ranged = data.filter(item => item.price >= minValue && item.price <= maxValue);
    
    dispatch(sortByUserPriceAction(ranged));

    event.target.reset();
  };

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {breadcrumbs &&
          breadcrumbs.map((item) => (
              <Link key={item.link} to={item.link} className="product-navigation__link">{item.name}</Link> 

          ))}
      </div>

      <div className="filter-wrapper">
        <form className="filter-wrapper__item" onChange={handleUserPrice}>
          <p>Price</p>
          <input type='number' placeholder='from' name='from' ></input>
          <input type='number' placeholder="to"  name='to'></input>
        </form>

        <div className="filter-wrapper__item">
          <p>Discounted items</p>
          <input type="checkbox" onChange={handleDiscountApply}></input>
        </div>

        <div className="filter-wrapper__item">
          <p>Sort</p>
          <select onChange={handleSort}>
            <option value="default">by default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products">
        <h2>{categoryTitle}</h2>

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
