import React, { useState, useEffect } from "react";
import "../CSS pages/reservation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TableReservationForm = () => {
  const navigate = useNavigate();
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
    customerName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/users", {
            headers: { "x-auth-token": token },
          });
          setReservation((prev) => ({
            ...prev,
            customerName: `${response.data.firstName} ${response.data.lastName}`,
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/reserve-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Table Reservation Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={reservation.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={reservation.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            value={reservation.guests}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="specialRequests">Special Requests:</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={reservation.specialRequests}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Reserve Table</button>
      </form>
    </div>
  );
};

export default TableReservationForm;
