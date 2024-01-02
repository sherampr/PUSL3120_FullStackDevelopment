// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, checkinDate, checkoutDate } = req.body;
    const newBooking = new Booking({
      firstName,
      lastName,
      checkinDate,
      checkoutDate,
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
