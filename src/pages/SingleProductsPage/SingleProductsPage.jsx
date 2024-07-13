import React, { useEffect, useState, useMemo  } from "react";
import "./SingleProductsPage.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/productSlice";
import { addToCart } from "@/store/cartSlice ";
import { RiHeartFill } from "react-icons/ri";


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
  const [addedToCart, setAddedToCart] = useState(false);
  const apiUrl = import.meta.env.APP_API_URL;
  const memoizedProduct = useMemo(() => product, [product?.id, product?.title, product?.category?.id, product?.category?.name]);
  // при нажатии на иконку,устанавливается класс active 
  const [isFavourite, setIsFavourite] = useState(false);
  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite)
  };

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
        { link: "/allproducts", name: "All products" },
        { link: `/products/${product.id}`, name: product.title }
      ]);
    }
  }, [product.id, product.category?.id, product.title]);

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

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
    setAddedToCart(false)
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      addToCart(false)
      setAddedToCart(false)

    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart({product, quantity, selected: true}))
    setQuantity(0);
    console.log(`Added ${quantity} of ${product.title} to cart from singleProductPage.`);
  };

  return (
    <main className="maincontainer">
      <div className="product-navigation">
        {breadcrumbs.map((item) => (
          <span key={item.link}>
            <Link to={item.link} className="product-navigation__link">
              {item.name}
            </Link>
          </span>
        ))}
      </div>

      <div className="product-details"> 


        <div className="product-details__image" onClick={() => setImageOpen(product)}>
          <img src={`${apiUrl}${product.image}`} alt={product.title} />
        </div>


        <div className="product-details__title">
          <h1 className="product-details__title-text">{product.title}</h1>
          <RiHeartFill
          className={`icon-favourite ${isFavourite ? 'icon-favourite-active' : ''}`}
          onClick={handleFavouriteClick} />
        </div>
          
        <div className="product-details__info">
          <div className="product-details__price-wrapper">
            {product.discont_price ? (
              <>
                <span className="discount-price product-details__price--discount">{`$${product.discont_price}`}</span>
                <span className="original-price product-details__price--original">{`$${product.price}`}</span>
                <span className="product-details__discount">{`-${Math.round(100 - (product.discont_price / product.price) * 100)}%`}</span>
              </>
            ) : (
              <span className="product-details__price product-details__price--discount">{`$${product.price}`}</span>
            )}
          </div>

          <div className="product-details__buttons">
            <div className="product-details__counter">
              <button className="product-details__quantity-button" onClick={handleDecreaseQuantity} >-</button>
              <span className="product-details__quantity">{quantity}</span>
              <button className="product-details__quantity-button" onClick={handleIncreaseQuantity}>+</button>       
            </div>
            
            <button className={`product-details__add-to-cart btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={addedToCart} >
              {addedToCart ? 'Added' : 'Add to cart'}
            </button>
          </div>
          
          <div className="product-details__description">
            <span className="product-details__description-label">Description</span>
            <p className={`product-details__description-text ${isDescriptionExpanded ? 'expanded' : ''}`}>
              {product.description}
            </p>
            {product.description.length > 200 && (
            <a className="product-details__description_read-more" onClick={toggleDescription}>
              {isDescriptionExpanded ? 'Read less' : 'Read more'}
            </a>
            )}
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
      </div>
    </main>
  );
};

export default SingleProductsPage;

