import react from 'react';

export default function BookingList() {
    return (
      <div>
        <h1>Bookings available</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Customer name</th>
              <th>Room type</th>
              <th>Room number</th>
              <th>Check in date</th>
              <th>Check out date</th>
              <th>Number of guests</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chenuka</td>
              <td>Deluxe</td>
              <td>Room number:1</td>
              <td>12/27/2023</td>
              <td>12/30/2023</td>
              <td>4</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    );
  }
  