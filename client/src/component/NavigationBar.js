import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


// NavigationBar component
const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/list">Booking List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;