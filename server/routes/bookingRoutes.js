// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email,         // Add the email field
      checkinDate, 
      checkoutDate, 
      guestNumber, 
      roomType, 
      price 
    } = req.body;

    const newBooking = new Booking({
      firstName,
      lastName,
      email,         // Include the email field when creating the booking
      checkinDate,
      checkoutDate,
      guestNumber,
      roomType, 
      price 
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ... other routes ...

module.exports = router;
