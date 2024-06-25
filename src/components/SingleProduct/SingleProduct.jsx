import React from 'react'
import "./SingleProduct.scss";

const SingleProduct = ({product}) => {
if(!product){
  return <div className="loader"></div>
}

  const apiUrl = import.meta.env.APP_API_URL;
   const discountCounter = (product) => Math.round(100-(product.discont_price / product.price * 100))
  
    return (
      <div className="singleProduct" key={product.id}>
          <img src={`${apiUrl}${product.image}`} alt={product.title} />

          {
            product.discont_price &&  <span className="discount">{`-${discountCounter(product)}%`}</span>
          }  
          
        <div className="singleProduct__info">
            <h4 className="info-title">{product.title}</h4>

            <span className="info-price" >
              {`$${product.discont_price}`}

              {
              product.discont_price && <span>{`$${product.price}`}</span>
              }
            </span>
        </div>
      </div>
      );
    }

export default SingleProduct
