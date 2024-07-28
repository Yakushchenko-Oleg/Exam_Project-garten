// src/pages/AllSalesPage/AllSalesPage.jsx
import React, { useEffect, useState } from "react";
import "./AllSalesPage.scss";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  sortByPriceAction,
  sortByUserPriceAction,
} from "@/store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "@/components/SingleProduct/SingleProduct";

const AllSalesPage = () => {

  const dispatch = useDispatch();
  const { recivedProducts, filteredProducts, isLoading, error } = useSelector((state) => state.products);
  const [sortValue, setSortValue] = useState("default");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("Title");
  let  data  = [];

  if (filteredProducts && filteredProducts.length > 0) {
    data = filteredProducts.filter((item) => item.discont_price)
  } else{
    data = recivedProducts.data.filter((item) => item.discont_price)
  }
 
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setCategoryTitle("All sales");
    setBreadcrumbs([
      { link: "/", name: "Main page " },
      { link: "/allsales", name: "All sales" },
    ]);
  }, []);

  useEffect(()=>{
    dispatch(sortByPriceAction({ value: sortValue}));
  },[sortValue])

  const handleSort = (event) => {
    setSortValue(event.target.value);
  };

  const handleUserPrice = (event) => {
    event.preventDefault();

    let formData = new FormData(event.target.parentElement); //userInput
    let formObject = Object.fromEntries(formData);

    const minValue = formObject.from === "" ? -Infinity : +formObject.from;
    const maxValue = formObject.to === "" ? Infinity : +formObject.to;

    dispatch(sortByUserPriceAction({ minValue, maxValue }));
    dispatch(sortByPriceAction({ value: sortValue }));
  };

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

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

        {isLoading 
          ? <div className="wrapper">
              {
              skeleton.map((item) => (
                <div className="loader" key={item}></div>
              ))
              }
            </div>
          : <div className="wrapper">
              {
              data && data.map((item) => (
                <SingleProduct key={item.id} product={item} />
              ))
              }
            </div>
          }
        {error && <h2> Error from server: {error} </h2>}
      </div>
    </main>
  );
};

export default AllSalesPage;
