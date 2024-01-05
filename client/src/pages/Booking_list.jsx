import React, { useEffect, useState } from 'react';
import '../styles/BookingList.css'; // Import the CSS file
import { useLocation } from 'react-router-dom';
const location = useLocation();
const { checkInDate, checkOutDate } = location.state;

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from the server
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
              <td>{checkInDate && checkInDate.toLocaleDateString()}</td>
               <td>{checkOutDate && checkOutDate.toLocaleDateString()}</td>
              <td>{booking.guestNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
