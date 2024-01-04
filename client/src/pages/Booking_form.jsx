import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';

function BookingForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [guestNumber, setGuestNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!firstName || !lastName || !checkinDate || !checkoutDate || !guestNumber) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          checkinDate,
          checkoutDate,
          guestNumber,
        }),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Booking submitted successfully');
        // You may want to reset the form after successful submission
        resetForm();
      } else {
        // Handle error (e.g., show an error message)
        console.error('Failed to submit booking');
        setErrorMessage('Failed to submit booking');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setCheckinDate(null);
    setCheckoutDate(null);
    setGuestNumber('');
    setErrorMessage('');
  };

  return (
    <div>
      <div className='booking-form-container'>
        <h1>Booking confirmation</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Check-in date</label>
            <DatePicker
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
              placeholderText="Select check-in date"
            />
          </div>

          <div className="form-group">
            <label>Check-out date</label>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
              placeholderText="Select check-out date"
            />
          </div>

          <div className="form-group">
            <label>Select number of guests</label>
            <input
              type="number"
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
            />
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
    </div>
  );
}

export default BookingForm;
