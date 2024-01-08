import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/list.css';

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
        setError('Error fetching bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Bookings available</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="booking-table">
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
                <td>{formatDate(booking.checkinDate)}</td>
                <td>{formatDate(booking.checkoutDate)}</td>
                <td>{booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
