import React, { useContext, useState } from "react";
import "./SingleProduct.scss";
import { addToCart } from "@/store/cartSlice ";
import { useDispatch, useSelector } from "react-redux";
import { RiHeartFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import {ThemeContext} from '../../providers/ThemeProvider'

import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../../store/cartSlice ";


const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  // при нажатии на иконку,устанавливается класс active 
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteClick = () => {
    const carentFavoriteState = !isFavourite
    setIsFavourite(carentFavoriteState)

    if (!isFavourite) {
      dispatch(addToFavorites(product))      
    } else {
      dispatch(removeFromFavorites(product))      
    }
    console.log(isFavourite);

  };

  // при нажатии на иконку,устанавливается класс active 
  const [isCart, setIsCart] = useState(false);
  
  const cart = useSelector(state => state.cart);

  if (!product) {
    return <div className="loader"></div>;
  }

  const apiUrl = import.meta.env.APP_API_URL;

  const discountCounter = (product) =>
    Math.round(100 - (product.discont_price / product.price) * 100);

  const handleAddToCart = () => {
    dispatch(addToCart({product, quantity: 1, selected: true}));
    setIsCart(!isCart);
  };

  const {theme} = useContext(ThemeContext);


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
          onClick={handleFavouriteClick}
        />
        <GiShoppingBag 
          className={`icon-cart ${isCart ? 'icon-cart-active' : ''}`}
          onClick={()=>{handleAddToCart()}}
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
