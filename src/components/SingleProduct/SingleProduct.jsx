import React, { useContext, useEffect, useState } from "react";
import "./SingleProduct.scss";
import { addToCart } from "@/store/cartSlice ";
import { useDispatch, useSelector } from "react-redux";
import { RiHeartFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import {ThemeContext} from '../../providers/ThemeProvider'

import { Link } from "react-router-dom";
import { removeFromCart } from "../../store/cartSlice ";
import { addTofavourites, removeFromfavourites } from "../../store/favouritesSlice";


const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  const { cart } = useSelector(state => state.cart);
  const { favourites } = useSelector(state => state.favourites);
  const {theme} = useContext(ThemeContext);
  const apiUrl = import.meta.env.APP_API_URL;

  const [isFavourite, setIsFavourite] = useState(false); // при нажатии на иконку,устанавливается класс active 
    
  const [isCart, setIsCart] = useState(false); // при нажатии на иконку,устанавливается класс active 

  useEffect(()=> {
    let inCart =  cart.find(item => item.id === product.id)

    if (inCart) {
      setIsCart(true)
    } else{
      setIsCart(false)
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

    if (!isCart) {
          dispatch(addToCart({product, quantity: 1}));
    setIsCart(true);
    } else{
      dispatch(removeFromCart(product))
      setIsCart(false);
    }
  };


  

  if (!product) {
    return <div className="loader"></div>;
  }

  const discountCounter = (product) =>
    Math.round(100 - (product.discont_price / product.price) * 100);

  return (
    <div className="singleProduct" key={product.id}>
      {/* картинка обернута в контэйнер для регулирования высоты */}
      <div className="img-container"> 
      <img src={`${apiUrl}${product.image}`} alt={product.title} />
      </div> 
      {
        product.discont_price && (
        <span className="discount">{`-${discountCounter(product)}%`}</span>
      )}

      <div className="icon-wrapper">
        <RiHeartFill
          className={`icon-favourite ${isFavourite ? 'icon-favourite-active' : ''}`}
          onClick={handleAddToFavourite}
        />
        <GiShoppingBag 
          className={`icon-cart ${isCart ? 'icon-cart-active' : ''}`}
          onClick={handleAddToCart}
        />
      </div>

      <div className={`singleProduct__info ${theme ? 'singleProduct__info-dark' : ''}`}>
        <Link to={`/products/${product.id}`} className="item__title">
          <h4 className="info-title">{product.title}</h4>
        </Link>
        
        <div className="info-price">
          {
            product.discont_price ? (
            <>
              <span className="discount-price">{`$${product.discont_price}`}</span>
              <span className="original-price">{`$${product.price}`}</span>
            </>
          ) : (
            <span className="info-price">{`$${product.price}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
