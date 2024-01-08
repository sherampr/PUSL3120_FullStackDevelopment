// userDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/UserDetails.css";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";


const UserDetails = () => {
  const [data, setData] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      // Fetch user details
      axios
        .get("/api/users", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
        .then((res) => {
          const userEmail = res.data.email;
          setData(res.data);

          // Fetch booking details for the specific user based on email
          axios
            .get(`/api/bookings/user?email=${userEmail}`, {
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            })
            .then((bookingRes) => {
              setBookingData(bookingRes.data);
            })
            .catch((bookingErr) => {
              console.log("Error fetching booking details:", bookingErr);
            });
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


  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/bookings/${bookingId}`, {
        headers: { "x-auth-token": token },
      });
      // Refresh the bookingData after cancellation
      const updatedBookingData = bookingData.filter(booking => booking._id !== bookingId);
      setBookingData(updatedBookingData);
    } catch (error) {
      console.error("Error cancelling booking:", error);
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
          UserName: {data.firstName} {data.lastName}
        </p>
        <p>Email: {data.email}</p>
        <p>Phone number: {data.phone}</p>
        <div className="delete">
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
      <div className="booking">
        
        <div className="booking_details">
          
          {bookingData.map((booking) => (
            
            <div key={booking._id} className="booking_row">
              <h2>Your booking details</h2>
              <p>{`Full name: ${booking.firstName} ${booking.lastName}`}</p>
              <p>{`Room type: ${booking.roomType}`}</p>
              <p>{`Check-in date: ${new Date(booking.checkinDate).toLocaleDateString()}`}</p>
              <p>{`Check-out date: ${new Date(booking.checkoutDate).toLocaleDateString()}`}</p>
              <p>{`Room price: LKR${booking.price}`}</p>
              <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
              <Link to={`/updateBooking/${booking._id}`}>Update booking dates</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
