import React, { useState } from "react";
import axios from "axios";
import "../CSS pages/ReservationItem.css";

const ReservationItem = ({ reservation }) => {
  const [editableReservation, setEditableReservation] = useState({
    ...reservation,
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    setEditableReservation({
      ...editableReservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:3001/reservation/${editableReservation._id}`,
        editableReservation
      )
      .then((response) => {
        console.log("Reservation updated:", response.data);
        setEditMode(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error updating reservation:", error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/reservation/${editableReservation._id}`)
      .then((response) => {
        console.log("Reservation deleted:", response.data);
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting reservation:", error));
  };

  return (
    <div>
      {editMode ? (
        <>
          <input
            type="text"
            name="date"
            value={editableReservation.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="time"
            value={editableReservation.time}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="guests"
            value={editableReservation.guests}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="specialRequests"
            value={editableReservation.specialRequests}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Customer Name: {reservation.customerName}</p>
          <p>Date: {reservation.date}</p>
          <p>Time: {reservation.time}</p>
          <p>Guests: {reservation.guests}</p>
          <p>Special Requests: {reservation.specialRequests}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ReservationItem;
