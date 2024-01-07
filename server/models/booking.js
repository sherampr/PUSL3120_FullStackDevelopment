const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,  // Added email field
    checkinDate: Date,
    checkoutDate: Date,
    guestNumber: Number,
    roomType: String,  // Added room type field
    price: Number      // Added price field
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
