require("dotenv").config();

const express = require("express");
const roomRoutes = require("./routes/rooms");
const roomTypeRoutes = require("./routes/roomTypes");
const cors = require("cors");
const mongoose = require("mongoose");

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

app.use("/api/roomtypes", roomTypeRoutes);

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
app.post("api/register");
