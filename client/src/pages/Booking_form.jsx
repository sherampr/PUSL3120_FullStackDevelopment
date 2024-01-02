import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';

function BookingForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        }),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Booking submitted successfully');
      } else {
        // Handle error (e.g., show an error message)
        console.error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='booking-form-container'>
        <h1>Hotel booking</h1>
        <h3>Experience something new</h3>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>First name</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Select check-in</td>
                <td>
                  <DatePicker
                    selected={checkinDate}
                    onChange={(date) => setCheckinDate(date)}
                    placeholderText="Select check-in date"
                  />
                </td>
              </tr>
              <tr>
                <td>Select check-out</td>
                <td>
                  <DatePicker
                    selected={checkoutDate}
                    onChange={(date) => setCheckoutDate(date)}
                    placeholderText="Select check-out date"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">confirm</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
