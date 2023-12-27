const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const router = express.Router();

// Middleware to authenticate token
const authenticateToken = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

// Endpoint to get user details
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userData = await User.findById(req.user._id).select("-password");
    if (!userData) {
      return res.status(404).send("User not found.");
    }
    res.send(userData);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Endpoint to update user details
router.put("/", authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Endpoint to delete user account
router.delete("/", authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.send("Account deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
