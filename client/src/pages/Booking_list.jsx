import React, { useEffect, useState } from 'react';

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
      <table border="1">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Check in date</th>
            <th>Check out date</th>
            <th>Number of guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{`${booking.firstName} ${booking.lastName}`}</td>
              <td>{booking.checkinDate}</td>
              <td>{booking.checkoutDate}</td>
              <td>{booking.guestNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
