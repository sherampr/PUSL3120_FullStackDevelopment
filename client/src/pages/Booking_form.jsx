import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.css';

function BookingForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const[guestNumber,setGuestnum]=useState('');
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

  return (
    <div>
      <div className='booking-form-container'>
        <h1>Booking confirmation</h1>
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
              <tr>
                <td>Select number of guest</td>
                <td>
                  <input type="number"
                  value={guestNumber}
                  onChange={(e) => setGuestnum(e.target.value)}

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
