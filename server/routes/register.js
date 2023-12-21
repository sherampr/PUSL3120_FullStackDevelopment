const router = require("express").Router();
const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exist" });
    const slat = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, slat);

    await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
    }).save();
    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal sever error" });
  }
});
module.exports = router;
