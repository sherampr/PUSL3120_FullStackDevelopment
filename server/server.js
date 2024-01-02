// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');

// Load environment variables from a .env file (optional)
require('dotenv').config();


const app = express();
const port = process.env.PORT ; // Use 3001 as the default port if PORT is not defined


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  // Remove the deprecated options
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other options you may need
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/bookings', bookingRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
