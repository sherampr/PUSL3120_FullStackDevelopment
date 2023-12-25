import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Update isLoggedIn state based on the presence of the token
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Call the function to set initial state
    checkLoginStatus();

    // Optionally, set up an event listener for storage changes
    window.addEventListener("storage", checkLoginStatus);

    // Clean up the event listener
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <header>
      <div className="nav__logo">
        <Link to="/">
          <h1 className="felicon">Felicon Hotel</h1>
        </Link>
      </div>
      <div className="nav__links">
        <Link className="link" to="/rooms">
          <h5>Rooms</h5>
        </Link>
        <Link className="link" to="/">
          <h5>Services</h5>
        </Link>
      </div>
      <div className="nav__log_link">
        {!isLoggedIn ? (
          <Link className="link" to="/login">
            <h5>Login</h5>
          </Link>
        ) : (
          <Link className="link" to="/UserDetails">
            <FaRegUserCircle size={45} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
