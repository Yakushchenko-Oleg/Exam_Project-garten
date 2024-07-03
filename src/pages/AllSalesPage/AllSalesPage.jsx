// src/pages/AllSalesPage/AllSalesPage.jsx
import React, { useEffect, useState } from "react";
import "./AllSalesPage.scss";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  sortByPriceAction,
  sortByUserPriceAction,
} from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../../components/SingleProduct/SingleProduct";

const AllSalesPage = () => {
  const dispatch = useDispatch();
  const { recivedProducts, filteredProducts, isLoading, error } = useSelector(
    (state) => state.products
  );
  const { data } = recivedProducts;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("Discounted items");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProducts());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setCategoryTitle("Discounted items");
    setBreadcrumbs([
      { link: "/", name: "Main page " },
      { link: "/allsales", name: "All sales" },
    ]);
  }, []);

  const handleSort = (event) => {
    const value = event.target.value;
    let sorted = data.filter((item) => item.discont_price);

    if (value === "low-to-high") {
      sorted = [...sorted].sort((a, b) => a.price - b.price);
    } else if (value === "high-to-low") {
      sorted = [...sorted].sort((a, b) => b.price - a.price);
    }

    dispatch(sortByPriceAction(sorted));
  };

  const handleUserPrice = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target.parentElement);
    let formObject = Object.fromEntries(formData);

    const minValue = formObject.from === '' ? -Infinity : +(formObject.from);
    const maxValue = formObject.to === '' ? Infinity : +(formObject.to);

    const ranged = data.filter(
      (item) =>
        item.discont_price && item.price >= minValue && item.price <= maxValue
    );

    dispatch(sortByUserPriceAction(ranged));
    event.target.reset();
  };

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {breadcrumbs &&
          breadcrumbs.map((item) => (
            <Link key={item.link} to={item.link} className="product-navigation__link">
              {item.name}
            </Link>
          ))}
      </div>

      <div className="filter-wrapper">
        <form className="filter-wrapper__item" onChange={handleUserPrice}>
          <p className="filter-name">Price</p>
          <input className="userInput" type='number' placeholder='from' name='from'></input>
          <input className="userInput" type='number' placeholder="to" name='to'></input>
        </form>

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
          <h2>All sales</h2>
        </div>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="wrapper">
            {filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <Link to={`/products/${item.id}`} className="item__title" key={item.id}>
                    <SingleProduct product={item} />
                  </Link>
                ))
              : data
                  .filter((item) => item.discont_price)
                  .map((item) => (
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

export default AllSalesPage;
