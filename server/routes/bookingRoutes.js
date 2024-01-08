// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const RoomType = require('../models/roomTypeModel');

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

    // Validate that roomType is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(roomType)) {
      return res.status(400).json({ message: 'Invalid roomType ID' });
    }

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

    // Update room availability
    const roomTypeDetails = await RoomType.findById(roomType);
    if (roomTypeDetails) {
      roomTypeDetails.roomAvailability = Math.max(roomTypeDetails.roomAvailability - 1, 0);
      await roomTypeDetails.save();

      const io = req.app.get('socketio');
io.emit('roomAvailabilityUpdate', { roomId: roomType, newAvailability: roomTypeDetails.roomAvailability });
    }

    
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/bookings (Get all bookings)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
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

// ... other routes ...

module.exports = router;
