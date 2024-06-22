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
          {
            product.discont_price &&  
              <div className="singleProduct__discount-container">
                <span>{`-${discountCounter(product)}%`}</span>
              </div>

          }
           
          <img src={`${apiUrl}${product.image}`} alt={product.title} />

          <div className="singleProduct__info-cont">
            <h4 className="singleProduct__info-cont_title">{product.title}</h4>
            <span className="singleProduct__info-cont_price" >
              {`$${product.discont_price}`}
              {
                product.discont_price &&  
                <span>
                 {`$${product.price}`}
                </span>
              }
            </span>
          </div>
          
        </div>
      );
    }

export default SingleProduct

// {
//   "id": 1,
//   "title": "Savannah Summer Annual Collection",
//   "price": 53,
//   "discont_price": 50,
//   "description": "We love this fusion of colorful blossoms, created by combining some of the most floriferous and high performance annuals we know in our Savannah Summer Collection. Cherry-red Zinnia and sunrise-hued Lantana provide a perpetual fountain of flowers amidst the dark purple spiky foliage of Tradescantia.",
//   "image": "/product_img/1.jpeg",
//   "createdAt": "2022-10-02T14:43:29.000Z",
//   "updatedAt": "2022-10-02T14:43:29.000Z",
//   "categoryId": 1
// }