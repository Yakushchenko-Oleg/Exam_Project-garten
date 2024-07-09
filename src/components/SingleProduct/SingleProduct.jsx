import React from "react";
import "./SingleProduct.scss";
import { addToCart } from "@/store/cartSlice ";
import { useDispatch } from "react-redux";
import IconHeart  from '@public/images/singleProduct/icon-he.svg?react';
import IconCart  from '@public/images/singleProduct/icon-bas.svg?react';

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) {
    return <div className="loader"></div>;
  }

  const apiUrl = import.meta.env.APP_API_URL;

  const discountCounter = (product) =>
    Math.round(100 - (product.discont_price / product.price) * 100);

  const handleAddToCart = () => {
    // event.stopPropagation()
    dispatch(addToCart({product, quantity: 1}))
  };

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
        <IconCart className='icons' onClick={(event)=>{
          console.log(event);
          event.stopPropagation()
          handleAddToCart()
          }}/>
      </div>

      <div className="singleProduct__info">
        <h4 className="info-title">{product.title}</h4>
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
