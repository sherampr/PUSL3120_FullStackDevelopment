require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const roomRoutes = require("./routes/rooms");
const roomTypeRoutes = require("./routes/roomTypes");
const registerRoutes = require("./routes/register");
const authRoutes = require("./routes/auth");
const userDetailRoutes = require("./routes/userDetails");
const userDataRoutes = require("./routes/Data");
const reviews = require("./routes/review");
const rusers = require("./routes/rusers");

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

//routes
// app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roomtypes", roomTypeRoutes);
app.use("/api/users", registerRoutes);
app.use("/api/users", userDetailRoutes);
app.use("/api/users", userDataRoutes);
app.use("/api/reviews", reviews);

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