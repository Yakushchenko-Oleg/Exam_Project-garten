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
  const [sortValue, setSortValue] = useState("default");
  const [minValue, setMinValue] =useState(-Infinity)
  const [maxValue, setMaxValue] =useState(Infinity)
  const [discountItems, setDiscountItems] = useState(false)

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [categoryId, /*dispatch*/]);

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

  useEffect(() => {
    dispatch(sortByPriceAction({ value: sortValue }));
  }, [sortValue]);

  useEffect(() => {
    dispatch(sortByUserPriceAction({ minValue, maxValue }));
    dispatch(sortByPriceAction({ value: sortValue }));
    
    // dispatch(sortByDiscountAction({ applyDiscount: discountItems }));
  }, [minValue, maxValue]);
  
  useEffect(() => {
    if (discountItems) {
        dispatch(sortByDiscountAction({ applyDiscount: discountItems }));
      } else {
        dispatch(sortByUserPriceAction({ minValue, maxValue }));
        dispatch(sortByPriceAction({ value: sortValue }));
      }
  }, [discountItems]);
  
  


  //ф-ции для сортировки продуктов на странице
  const handleSort = (event) => {
    setSortValue(event.target.value);
  };



  const handleUserPrice = (event) => {
    event.preventDefault();

    let formData = new FormData(event.target.parentElement); //userInput
    let formObject = Object.fromEntries(formData);

    setMinValue(formObject.from === "" ? -Infinity : +formObject.from);
    setMaxValue(formObject.to === "" ? Infinity : +formObject.to);

    // dispatch(sortByUserPriceAction({ minValue, maxValue }));

    // dispatch(sortByPriceAction({ value: sortValue }));

    // dispatch(sortByDiscountAction({ applyDiscount: discountItems }));
  };

  const handleDiscountApply = (event) => {
    setDiscountItems(event.target.checked);


    // dispatch(sortByUserPriceAction({ minValue, maxValue }));

    // dispatch(sortByDiscountAction({ applyDiscount: discountItems }));

    // dispatch(sortByPriceAction({ value: sortValue }));
  };

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log("filteredProducts", filteredProducts);

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
          <h2>{categoryTitle}</h2>
        </div>

        <div className="filter-wrapper">
          <form className="filter-wrapper__item" onChange={handleUserPrice}>
            <p className="filter-name">Price</p>
            <input
              className="userInput"
              type="number"
              placeholder="from"
              name="from"
            ></input>
            <input
              className="userInput"
              type="number"
              placeholder="to"
              name="to"
            ></input>
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
          //если идет загрузка, вставляем Скeлетон
          <div className="wrapper">
            {skeleton.map((item) => (
              <div className="loader" key={item}></div>
            ))
            }
          </div>
        ) : (
          <div className="wrapper">
            {/* {filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <SingleProduct key={item.id} product={item} />
                ))
              : data.map((item) => (
                  <SingleProduct key={item.id} product={item} />
                ))} */}
          
          {filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <SingleProduct key={item.id} product={item} />
                ))
              : <h2>Ничего не найдено!!!!</h2>

          }
          </div>
        )}
        {error && <h2> Error from server: {error} </h2>}
      </div>
    </main>
  );
};

export default ProductsPage;
