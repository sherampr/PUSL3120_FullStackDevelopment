require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const roomRoutes = require("./routes/rooms");
const roomTypeRoutes = require("./routes/roomTypes");
const userRoutes = require("./routes/register");
const authRoutes = require("./routes/auth");

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roomtypes", roomTypeRoutes);
app.use("/api/users", userRoutes);

//DB connection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.post("api/users");
