import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
        fetchUserData(token);
      }
    };

    const fetchUserData = async (token) => {
      try {
        const response = await axios.get("/api/users", {
          headers: { "x-auth-token": token },
        });
        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

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
        <Link className="link" to="/menu">
          <h5>Restaurant Menu</h5>
        </Link>
        <Link className="link" to="/reserve-table">
          <h5>Restaurant Table Reservation</h5>
        </Link>
      </div>
      <div className="nav__log_link">
        {!isLoggedIn ? (
          <Link className="link" to="/login">
            <h5>Login</h5>
          </Link>
        ) : (
          <div className="user-info">
            <span className="user-name">{`${userData.firstName} ${userData.lastName}`}</span>
            <Link className="link" to="/UserDetails">
              <FaRegUserCircle
                onMouseOver={({ target }) =>
                  (target.style.color = "antiquewhite")
                }
                onMouseOut={({ target }) => (target.style.color = "white")}
                size={45}
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
