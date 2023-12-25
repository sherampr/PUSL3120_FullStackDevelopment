const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    if (!decoded) return res.status(400).send("Invalid token.");

    const userData = await User.findById(decoded._id).select("-password");
    if (!userData) return res.status(404).send("User not found.");

    res.send(userData);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
