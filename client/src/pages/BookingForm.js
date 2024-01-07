import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/form.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";

function BookingForm() {
  const location = useLocation();
  const { checkInDate, checkOutDate, roomType, price } = location.state;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    guestNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/users", {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          });
          setFormData({ ...formData, ...response.data });
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUserDetails();
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const validateForm = () => {
    const { firstName, lastName, email, guestNumber } = formData;
    if (!firstName || !lastName || !guestNumber || !email) {
      setErrorMessage("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingData = {
      ...formData,
      checkinDate: checkInDate,
      checkoutDate: checkOutDate,
      roomType,
      price,
    };
    console.log("Booking Data to be sent:", bookingData);

    try {
      await axios.post("/api/bookings", bookingData);
      console.log("Booking submitted successfully");
      resetForm();
    } catch (error) {
      console.error("Failed to submit booking", error);
      setErrorMessage("Failed to submit booking");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      guestNumber: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="booking-form-container">
      <h1>Booking Confirmation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Type</label>
          <input type="text" value={roomType} readOnly />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Check-in Date</label>
          <span className="date-display">
            {checkInDate.toLocaleDateString()}
          </span>
        </div>

        <div className="form-group">
          <label>Check-out Date</label>
          <span className="date-display">
            {checkOutDate.toLocaleDateString()}
          </span>
        </div>

        <div className="form-group">
          <label>Select Number of Guests</label>
          <input
            type="number"
            name="guestNumber"
            value={formData.guestNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="text" value={`${price} LKR`} readOnly />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="form-buttons">
          <button type="submit">Confirm</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
