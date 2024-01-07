const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("firstName lastName email phone");
    res.send(users);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

module.exports = router;
