require('dotenv').config()

const express = require('express');
const roomRoutes = require('./routes/rooms')
const roomTypeRoutes = require('./routes/roomTypes')

const mongoose = require('mongoose')

const app = express()
//middleware 
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

//routes
app.use('/api/rooms', roomRoutes)

app.use('/api/roomtypes', roomTypeRoutes)

//DB connection
if (require.main === module) {
    mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening on port ", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

module.exports = app;