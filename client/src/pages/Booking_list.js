import React, { useEffect, useState } from "react";
import "../styles/BookingList.css";
import { useLocation } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const { checkInDate, checkOutDate } = location.state || {}; // Added default empty object

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div>
      <h1>Bookings available</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>Number of guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{`${booking.firstName} ${booking.lastName}`}</td>
              <td>
                {checkInDate ? new Date(checkInDate).toLocaleDateString() : ""}
              </td>
              <td>
                {checkOutDate
                  ? new Date(checkOutDate).toLocaleDateString()
                  : ""}
              </td>
              <td>{booking.guestNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
