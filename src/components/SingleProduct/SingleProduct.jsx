import React from 'react'
import '../../App.scss';
import "./SingleProduct.scss";

const SingleProduct = ({product}) => {

  const apiUrl = import.meta.env.APP_API_URL;
   const discountCounter = (product) => Math.round(100-(product.discont_price / product.price * 100))
  



    return (
        <div className="singleProduct" key={product.id}>
            <div className="singleProduct__discount-container">
                <h6>{`-${discountCounter(product)}%`}</h6>
            </div>

          <img src={`${apiUrl}${product.image}`} alt={product.title} />
          <span>{product.title}</span>
        </div>
      );
    }

export default SingleProduct