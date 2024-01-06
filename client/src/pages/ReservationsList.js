import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationItem from './ReservationItem';
import "../CSS pages/ReservationsList.css";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/reservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      {reservations.map(reservation => (
        <ReservationItem key={reservation._id} reservation={reservation} />
      ))}
    </div>
  );
};

export default ReservationsList;
