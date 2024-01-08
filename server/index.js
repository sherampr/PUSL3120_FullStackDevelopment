require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");

// Import your models and routes
const MenuItem = require("./models/MenuItem");
const Reservation = require("./models/Reservation");
const roomTypeRoutes = require("./routes/roomTypes");
const bookingRoutes = require("./routes/bookingRoutes");
const registerRoutes = require("./routes/register");
const authRoutes = require("./routes/auth");
const userDetailRoutes = require("./routes/userDetails");
const userDataRoutes = require("./routes/Data");
const reviews = require("./routes/review");
const rusers = require("./routes/rusers");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.set("socketio", io);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const randomNum = Math.floor(Math.random() * (999999 - 99999 + 1)) + 99999;
    cb(null, randomNum + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//routes
// app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roomtypes", roomTypeRoutes);
app.use("/api/users", registerRoutes);
app.use("/api/users", userDetailRoutes);
app.use("/api/users", userDataRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviews);

// DB connection and server start
if (require.main === module) {
  mongoose
    .connect(process.env.MONG_URI)
    .then(() => {
      server.listen(process.env.PORT, () => {
        console.log("Server started on port " + process.env.PORT);
      });
    })
    .catch((error) => {
      console.log("Database connection failed. Error: ", error);
    });
}

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/menu", async (req, res) => {
  try {
    const users = await MenuItem.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/admin/menu/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const menuItem = new MenuItem({
      name: name,
      price: price,
      category: category,
      image: image,
    });

    await menuItem.save();

    res
      .status(201)
      .json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/menu/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { price } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      itemId,
      { price },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).send({ message: "Menu item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/menu/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const result = await MenuItem.findByIdAndDelete(itemId);
    if (!result) {
      return res.status(404).send({ message: "Menu item not found" });
    }
    res.send({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/reserve-table", async (req, res) => {
  const reservationData = req.body;

  try {
    const newReservation = new Reservation(reservationData);
    await newReservation.save();
    res
      .status(200)
      .json({ message: "Reservation saved", data: newReservation });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ message: "Error saving reservation", error: error });
  }
});

app.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find(); // Fetch all reservations
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res
      .status(500)
      .json({ message: "Error fetching reservations", error: error });
  }
});

app.put("/reservation/:id", async (req, res) => {
  const reservationId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updatedData,
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res
      .status(200)
      .json({ message: "Reservation updated", data: updatedReservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res
      .status(500)
      .json({ message: "Error updating reservation", error: error });
  }
});

app.delete("/reservation/:id", async (req, res) => {
  const reservationId = req.params.id;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation deleted" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res
      .status(500)
      .json({ message: "Error deleting reservation", error: error });
  }
});

module.exports = app;
