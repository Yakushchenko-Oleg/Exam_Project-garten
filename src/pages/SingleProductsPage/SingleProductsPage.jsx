import React, { useEffect, useState, useMemo  } from "react";
import "./SingleProductsPage.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice ";
import { RiHeartFill } from "react-icons/ri";
// import { addTofavourites, removeFromfavourites } from "../../store/favouritesSlice ";
import Modal from "../../components/Modal/Modal";
import { addTofavourites, removeFromfavourites } from "../../store/favouritesSlice";


const SingleProductsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recivedProducts, isLoading, error } = useSelector((state) => state.products);
  const { cart } = useSelector(state => state.cart);
  const { favourites } = useSelector(state => state.favourites);

  const { data } = recivedProducts || { data: [] };
  const product = data.find((item) => item.id === parseInt(id)) || {};
  const [imageOpen, setImageOpen] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const apiUrl = import.meta.env.APP_API_URL;
  const memoizedProduct = useMemo(() => product, [product?.id, product?.title, product?.category?.id, product?.category?.name]);
  const [isFavourite, setIsFavourite] = useState(false);// при нажатии на иконку,устанавливается класс active 
  
  useEffect(()=> {
    let inCart =  cart.find(item => item.id === product.id)

    if (inCart) {
      setQuantity(inCart.quantity)
    }
  },[cart, product])
  
  useEffect(()=> {
    let inFavourite = favourites.find(item => item.id === product.id)

    if (inFavourite) {
      setIsFavourite(true)
    } else{
      setIsFavourite(false)
    }
  },[favourites, product])

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
  const descriptionLength = 150; // Максимальная длина текста перед усечением
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Логика для рендеринга текста описания
  const renderDescription = () => {
    if (isDescriptionExpanded || product.description.length <= descriptionLength) {
      return product.description;
    } else {
      return `${product.description.substring(0, descriptionLength)}...`;
    }
  };


  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
    setAddedToCart(false)
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setAddedToCart(false)
    }
  };

  const handleAddToFavourite = () => {
    const carentfavouriteState = !isFavourite
    setIsFavourite(carentfavouriteState)

    if (!isFavourite) {
      dispatch(addTofavourites(product))      
    } else {
      dispatch(removeFromfavourites(product))      
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart({product, quantity}))
    setQuantity(0);
  };


  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <h2>Error: {error}</h2>; 
  }

  if (!product.id) {
    return <h2>Product not found</h2>;
  }


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
     
        <div className="product-details__image" onClick={() => setImageOpen(true)}>
          <img src={`${apiUrl}${product.image}`} alt={product.title} />
        
        {/* если диск.прайс есть,то применится 2ой discount-hiddenб а если нет, то пусто*/}
          {product.discont_price ? (
            <span className="product-details__discount-hidden">{`-${Math.round(100 - (product.discont_price / product.price) * 100)}%`}</span>
          ) : (
            <></>
          )}
        
        </div>

        <div className="product-details__title">
          <h1 className="product-details__title-text">{product.title}</h1>
          <RiHeartFill
          className={`icon-favourite ${isFavourite ? 'icon-favourite-active' : ''}`}
          onClick={handleAddToFavourite} />
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
              <a className="product-details__quantity-button" onClick={handleDecreaseQuantity} >-</a>
              <span className="product-details__quantity">{quantity}</span>
              <a className="product-details__quantity-button" onClick={handleIncreaseQuantity}>+</a>       
            </div>
            
            <button className={`product-details__add-to-cart btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={addedToCart} >
              {addedToCart ? 'Added' : 'Add to cart'}
            </button>
          </div>

        </div>

      <div className="product-details__description">
        <span className="product-details__description-label">Description</span>
        <p className={`product-details__description-text ${isDescriptionExpanded ? 'expanded' : ''}`}>
          {renderDescription()}
        </p>
        {product.description.length > descriptionLength && (
          <a className="product-details__description_read-more" onClick={toggleDescription}>
            {isDescriptionExpanded ? 'Read less' : 'Read more'}
          </a>
        )}
      </div>

      </div>

      {imageOpen && (

      <Modal >
        <img onClick={() => setImageOpen(false)} src={`${apiUrl}${product.image}`} alt={product.title} />
      </Modal>

      )
      }



    </main>
  );
};



export default SingleProductsPage;

