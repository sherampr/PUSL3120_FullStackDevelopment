import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

const StaffNavbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is admin
  const isLoggedIn = localStorage.getItem("token") !== null; // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload();
  };
  return (
    <header>
      <div className="nav__logo">
        <h1 className="felicon">Felicon Hotel</h1>
      </div>
      <div className="nav__links">
        <Link className="link" to="/staff/newroom">
          <h5>New Room</h5>
        </Link>

        <Link className="link" to="/staff/currentrooms">
          <h5>Current Rooms</h5>
        </Link>

        <Link className="link" to="/staff/viewbook">
          <h5>Reserved Tables</h5>
        </Link>

        <Link className="link" to="/staff/bookinglist">
          <h5>Booking</h5>
        </Link>

        <Link className="link" to="/staff/menu">
          <h5>Manage Restaurant Menu</h5>
        </Link>

        {isLoggedIn && isAdmin ? (
          <div className="logout-s">
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link className="link" to="/login">
            <h5>Login</h5>
          </Link>
        )}
      </div>
    </header>
  );
};
export default StaffNavbar;
