import React, { useEffect, useState } from "react";
import "./SingleProductsPage.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/productSlice";

const SingleProductsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recivedProducts, isLoading, error } = useSelector((state) => state.products);
  const { data } = recivedProducts || { data: [] }; 
  const product = data.find((item) => item.id === parseInt(id)) || {}; 
  const [imageOpen, setImageOpen] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const apiUrl = import.meta.env.APP_API_URL;

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, data.length]);

  useEffect(() => {
    if (product && product.category) {
      setBreadcrumbs([
        { link: "/", name: "Main page" },
        { link: "/categories", name: "Categories" },
        { link: `/categories/${product.category.id}`, name: product.category.name },
        { link: `/products/${product.id}`, name: product.title }
      ]);
    } else {
      setBreadcrumbs([
        { link: "/", name: "Main page" },
        { link: "/categories", name: "Categories" },
        { link: "/allproducts", name: "All products" }
      ]);
    }
  }, [product]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!product.id) {
    return <h2>Product not found</h2>;
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart.`);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {breadcrumbs.map((item, index) => (
          <span key={item.link}>
            <Link to={item.link} className="product-navigation__link">
              {item.name}
            </Link>
            {index < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </div>

      <div className="product-details">
        <div className="product-details__container">
          <div className="product-details__image" onClick={() => setImageOpen(product)}>
            <img src={`${apiUrl}${product.image}`} alt={product.title} />
          </div>
          <div className="product-details__info">
            <div className="product-details__title-wrapper">
              <h1 className="product-details__title">{product.title}</h1>
              <img src="./images/singleProduct/icon-he.svg" alt="Icon" className="product-details__icon" />
            </div>
            <div className="product-details__price-wrapper">
              {product.discont_price ? (
                <>
                  <span className="product-details__price--discount">{`$${product.discont_price}`}</span>
                  <span className="product-details__price--original">{`$${product.price}`}</span>
                  <span className="product-details__discount">{`-${Math.round(100 - (product.discont_price / product.price) * 100)}%`}</span>
                </>
              ) : (
                <span className="product-details__price">{`$${product.price}`}</span>
              )}
            </div>
            <div className="product-details__buttons">
              <button className="product-details__quantity-button" onClick={handleDecreaseQuantity}>-</button>
              <span className="product-details__quantity">{quantity}</span>
              <button className="product-details__quantity-button" onClick={handleIncreaseQuantity}>+</button>
              <button className="product-details__add-to-cart" onClick={handleAddToCart}>Add to cart</button>
            </div>
            <span className="product-details__description-label">Description</span>
            <p className={`product-details__description ${isDescriptionExpanded ? 'expanded' : ''}`}>
              {product.description}
            </p>
            {product.description.length > 200 && (
              <button className="product-details__read-more" onClick={toggleDescription}>
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>

      {imageOpen && (
        <div className="modal" onClick={() => setImageOpen(null)}>
          <div className="modal-content">
            <div className="modal__header">
              <button onClick={() => setImageOpen(null)} className="modal__close-button">Close</button>
            </div>
            <div className="modal__body">
              <img src={`${apiUrl}${imageOpen.image}`} alt={imageOpen.title} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SingleProductsPage;
