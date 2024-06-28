// src/components/Navigation/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = ({ currentPage }) => {
  return (
    <div className="navigation">
      <Link to="/" className="navigation__link">Main page</Link>
      <span className="navigation__separator"></span>
      <span className="navigation__current">{currentPage}</span>
    </div>
  );
};

export default Navigation;
