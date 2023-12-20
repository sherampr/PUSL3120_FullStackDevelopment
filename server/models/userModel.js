const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordcomplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: string, require: true },
  lastName: { type: string, require: true },
  email: { type: string, require: true },
  password: { type: string, require: true },
  confirmPassword: { type: string, require: true },
  phone: { type: string, require: true },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this_id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "0.5h",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (user) => {
  const schema = joi.object({
    firstName: joi.string().required().label("firstName"),
    lastName: joi.string().required().label("lastName"),
    email: joi.string().required().label("email"),
    password: passwordcomplexity().required().label("password"),
    confirmPassword: passwordcomplexity().required().label("confirmPassword"),
    phone: joi.string().required().label("phone"),
  });
  return schema.validate(user);
};
module.exports = { User, validate };
