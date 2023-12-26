import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function BookingForm() {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="booking-form-container">
      <h1>Hotel booking</h1>
      <h3>Experience something new</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input type="text" placeholder="Enter name" />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="text" placeholder="Enter email address" />
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
  );
}

export default BookingForm;
