import React, { useContext } from "react";
import "./SingleProduct.scss";
import { addToCart } from "@/store/cartSlice ";
import { useDispatch } from "react-redux";
import IconHeart  from '@public/images/singleProduct/icon-he.svg?react';
import IconCart  from '@public/images/singleProduct/icon-bas.svg?react';
import {ThemeContext} from '../../providers/ThemeProvider'
import { Link } from "react-router-dom";


const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) {
    return <div className="loader"></div>;
  }

  const apiUrl = import.meta.env.APP_API_URL;

  const discountCounter = (product) =>
    Math.round(100 - (product.discont_price / product.price) * 100);

  const handleAddToCart = () => {
    dispatch(addToCart({product, quantity: 1, selected: true}))
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
        <IconHeart className='icons'/>
        <IconCart className='icons' onClick={()=>{handleAddToCart()}}/>
      </div>

      <div className={`singleProduct__info ${theme ? 'singleProduct__info-light' : 'singleProduct__info-dark'}`}>
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
