// NavigationBar.js

import React from 'react';
import './navigationBar.css';

const NavigationBar = () => {
  return (
    <div className="navbar">
      <a className="nav-link" href="/">
        Booking form
      </a>
      <a className="nav-link" href="/list">
        Booking List
      </a>
    </div>
  );
};

export default NavigationBar;
