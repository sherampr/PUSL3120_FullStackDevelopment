import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'../styles/list.css'

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Bookings available</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Room type</th>
            <th>Check in date</th>
            <th>Check out date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{`${booking.firstName} ${booking.lastName}`}</td>
              <td>{booking.roomType}</td>
              <td>{new Date(booking.checkinDate).toLocaleDateString()}</td>
              <td>{new Date(booking.checkoutDate).toLocaleDateString()}</td>
              <td>{booking.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
