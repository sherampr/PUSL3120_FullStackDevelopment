const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordcomplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "0.5h",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (user) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    email: joi.string().required().label("Email"),
    password: passwordcomplexity().required().label("Password"),
    phone: joi.string().required().label("Phone"),
  });
  return schema.validate(user);
};
module.exports = { User, validate };
