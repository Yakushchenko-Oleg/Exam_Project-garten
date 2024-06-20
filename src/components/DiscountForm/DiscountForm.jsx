import React from 'react'
import '../../App.scss'
import  './DiscountForm.scss'


const DiscountForm = () => {
  const handleSend = () => {
    console.log({
      username,
      phonenumber,
      email,
    });
  };
  return (
    <div className="discount__container">
      <h3 className="discount__title">5% off on the first order</h3>
      <div className="form__container">
        <img src="../../../public/images/dicount/discount_image.svg" alt="" />
        <div className="form">
          <div className="form__item">
            <label htmlFor="username"></label>
            <input
              placeholder="Name"
              type="text"
              id="username"
              name="username"
              //   value={name}
              //   onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__item">
            <label htmlFor="phonenumber"></label>
            <input
              placeholder="Phone number"
              type="text"
              id="phonenumber"
              name="phonenumber"
              //   value={phonenumber}
              //   onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>

          <div className="form__item">
            <label htmlFor="email"></label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="discount__btn" onClick={handleSend}>
            Get a discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;