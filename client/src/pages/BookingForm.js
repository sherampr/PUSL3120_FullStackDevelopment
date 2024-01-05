import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function BookingForm() {
  const location = useLocation();
  const { checkInDate, checkOutDate } = location.state;

  const UserDetails = () => {
    const [data, setData] = useState({});
    const [checkinDate, setCheckinDate] = useState(checkInDate);
    const [checkoutDate, setCheckoutDate] = useState(checkOutDate);
    const [guestNumber, setGuestNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    useEffect(() => {
      const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await axios.get("/api/users", {
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            });
            setData(response.data);
          } catch (err) {
            console.log(err);
          }
        }
      };

      fetchUserDetails();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate input fields
      if (!data.firstName || !data.lastName || !checkinDate || !checkoutDate || !guestNumber) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      try {
        const response = await axios.post('/api/bookings', {
          firstName: data.firstName,
          lastName: data.lastName,
          checkinDate,
          checkoutDate,
          guestNumber,
        });

        // Handle success (e.g., show a success message)
        console.log('Booking submitted successfully');
        // You may want to reset the form after successful submission
        resetForm();
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Failed to submit booking', error);
        setErrorMessage('Failed to submit booking');
      }
    };

    const resetForm = () => {
      setCheckinDate(null);
      setCheckoutDate(null);
      setGuestNumber('');
      setErrorMessage('');
    };

    return (
      <div className='booking-form-container'>
        <h1>Booking Confirmation</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Room type</label>
            <input/>
          </div>

          
          <div className="form-group">
            <label>First Name</label>
            <input type="text" defaultValue={data.firstName} readOnly />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue={data.lastName} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={data.email} readOnly />
          </div>

          <div className="form-group">
            <label>Check-in date</label>
            {checkInDate && checkInDate.toLocaleDateString()}
          </div>

          <div className="form-group">
            <label>Check-out date</label>
            {checkOutDate && checkOutDate.toLocaleDateString()}
          </div>

          <div className="form-group">
            <label>Select number of guests</label>
            <input
              type="number"
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
            />
          </div>
          

          <div className="form-group">
            <label>Price</label>
            <input/>
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
  };

  return <UserDetails />;
}

export default BookingForm;
