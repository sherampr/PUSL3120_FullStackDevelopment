

//booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  checkinDate: Date,
  checkoutDate: Date,
  guestNumber: Number  // Corrected type
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
