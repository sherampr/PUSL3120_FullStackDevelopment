import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/UserDetails.css";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

const UserDetails = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("/api/users", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 401) {
            navigate("/login");
          }
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/api/users", {
        headers: { "x-auth-token": token },
      });
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div>
      <div className="hello">
        <h1>Hello there {data.firstName}</h1>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="profile">
        <h2>Profile</h2>
        <div className="edit">
          <Link to="/Userupdate">
            <FaUserEdit
              size={25}
              onMouseOver={({ target }) => (target.style.color = "black")}
              onMouseOut={({ target }) => (target.style.color = "purple")}
            />
          </Link>
        </div>
        <p>
          userName: {data.firstName} {data.lastName}
        </p>
        <p>Email: {data.email}</p>
        <p>phone number: {data.phone}</p>
        <div className="delete">
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
      <div className="booking">
        <h1>Booking details</h1>
        <div className="booking_details">
          <label>Room type</label>
          <label>Check-in date</label>
          <label>Check-out date</label>
          <label>Room price</label>
          <div className="delete_booking">
            <IoTrashBinSharp size={35} />
            <h5>created date</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
