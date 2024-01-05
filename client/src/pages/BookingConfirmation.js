import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const { checkInDate, checkOutDate } = location.state;

    return (
        <div>
            <h1>Booking Confirmation</h1>
            <p>Check-In Date: {checkInDate && checkInDate.toLocaleDateString()}</p>
            <p>Check-Out Date: {checkOutDate && checkOutDate.toLocaleDateString()}</p>
        </div>
    );
}

export default BookingConfirmation;
