// bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email,         
      checkinDate, 
      checkoutDate, 
      guestNumber, 
      roomType, 
      price 
    } = req.body;

    const newBooking = new Booking({
      firstName,
      lastName,
      email,
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

router.get('/', async (req, res) => {
  try {
    // Fetch all bookings from the database or data source
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/bookings/user?email=:email (Get bookings for a specific user)
router.get('/user', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const bookings = await Booking.find({ email: userEmail });

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/bookings/:id (Get a booking by ID)
router.get('/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/bookings/:id (Update a booking by ID)
router.put('/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updatedBookingData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updatedBookingData,
      { new: true } // This option returns the modified document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// bookingRoutes.js

// ... (existing code)

// DELETE /api/bookings/:id (Cancel a booking by ID)
router.delete('/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking cancelled successfully', booking: deletedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
