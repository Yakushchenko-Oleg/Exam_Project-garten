import React, { useEffect, useState } from "react";
import "./FavouritesPage.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../../components/SingleProduct/SingleProduct.jsx";

import { getfavouritessFromLocalStorage,
        sortByPriceAction,
        sortByDiscountAction,
        sortByUserPriceAction
 } from "../../store/favouritesSlice.js";


const FavouritesPage = () => {
   
  const dispatch = useDispatch();
  const { favourites, isLoading, error } = useSelector(
    (state) => state.favourites
  );
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [sortValue, setSortValue] = useState("default")


  useEffect(() => {
    if (favourites) {
      dispatch(getfavouritessFromLocalStorage());}
    }, [dispatch]);

  useEffect(() => {
    if (favourites.length > 0) {
      setBreadcrumbs([
        { link: "/", name: "Main page" },
        { link: "/favourites", name: "Favourites" },
      ]);
    }
  }, [favourites]);

  // ф-ции для сортировки - из FavouritesSlice!
  const handleUserPrice = (event) => {
    event.preventDefault(); 

    let formData = new FormData(event.target.parentElement); //userInput
    let formObject = Object.fromEntries(formData);
    console.log(formObject);

    const minValue = formObject.from === "" ? -Infinity : +formObject.from;
    const maxValue = formObject.to === "" ? Infinity : +formObject.to;

    dispatch(sortByUserPriceAction({ minValue, maxValue }));

    dispatch(sortByPriceAction({ value: sortValue}));

    dispatch(sortByDiscountAction({ applyDiscount: userValue }));
  };

  const handleDiscountApply = (event) => {
    const userValue = event.target.checked;
   
    dispatch(sortByDiscountAction({ applyDiscount: userValue }));
   
    dispatch(sortByUserPriceAction({ minValue, maxValue }));

    dispatch(sortByPriceAction({ value: sortValue}));  
  };

  const handleSort = (event) => {
    setSortValue(event.target.value);
  };

  useEffect(()=>{
    dispatch(sortByPriceAction({ value: sortValue}));
  },[sortValue, dispatch])
    
   
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

      <div className="products container">
        <div className="header-wrapper">
          <h2>Favourite Products</h2>
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

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="wrapper">
            {favourites && favourites.length > 0
              ? favourites.map((item) => (
                  <SingleProduct key={item.id} product={item} />
                ))
              : (<div className="cart__enpty">
                <p className='notfound'>No favourite products found</p>
                <Link to="/allproducts"> <button className='btn'> Continue Shopping </button></Link>
              </div>)
            }
          </div>  
        )}
        {error && <h2> Error from server: {error} </h2>}
      </div>
    </main>
  );
};

export default FavouritesPage;
