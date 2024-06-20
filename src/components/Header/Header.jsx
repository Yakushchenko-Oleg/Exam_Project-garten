import React from "react";
import '../../App.scss';
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__h1">Amazing Discounts on Garden Products!</h1>
      <button className="header__btn">Check out</button>
    </div>
  );
};

export default Header;
