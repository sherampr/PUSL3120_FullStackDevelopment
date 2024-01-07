const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: String,
  time: String,
  guests: Number,
  specialRequests: String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
