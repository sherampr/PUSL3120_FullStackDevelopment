import React, { useState } from "react";
import "../CSS pages/Signuppage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setServerError("");
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.firstName) errors.firstName = "First name cannot be empty";
    if (!data.lastName) errors.lastName = "Last name cannot be empty";
    if (!data.email || !emailRegex.test(data.email))
      errors.email = "Email should be lowercase and valid";
    if (!data.password) errors.password = "Password cannot be empty";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!data.phone) errors.phone = "Phone number cannot be empty";
    else if (!phoneRegex.test(data.phone))
      errors.phone = "Phone number must be numeric and 10 digits";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      const url = "/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/Login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setServerError(error.response.data.message);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://media.cntraveler.com/photos/53dad07e6dec627b14a04855/master/w_1920%2Cc_limit/four-seasons-bali-at-jimbaran-bay-bali-jimbaran-indonesia-108728-2.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create an account</h1>
          <h4>FirstName</h4>
          <input
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            onChange={handleChange}
          />
          {validationErrors.firstName && (
            <div className="error_msg">{validationErrors.firstName}</div>
          )}

          <h4>LastName</h4>
          <input
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            onChange={handleChange}
          />
          {validationErrors.lastName && (
            <div className="error_msg">{validationErrors.lastName}</div>
          )}

          <h4>Email address</h4>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          {validationErrors.email && (
            <div className="error_msg">{validationErrors.email}</div>
          )}

          <h4>Password</h4>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          {validationErrors.password && (
            <div className="error_msg">{validationErrors.password}</div>
          )}
          {validationErrors.passwordUpperCase && (
            <div className="error_msg">
              {validationErrors.passwordUpperCase}
            </div>
          )}
          {validationErrors.passwordLower && (
            <div className="error_msg">{validationErrors.passwordLower}</div>
          )}
          {validationErrors.passwordNumber && (
            <div className="error_msg">{validationErrors.passwordNumber}</div>
          )}
          {validationErrors.passwordSymbol && (
            <div className="error_msg">{validationErrors.passwordSymbol}</div>
          )}

          <h4>Confirm Password</h4>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            onChange={handleChange}
          />
          {validationErrors.confirmPassword && (
            <div className="error_msg">{validationErrors.confirmPassword}</div>
          )}

          <h4>Telephone number</h4>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
          {validationErrors.phone && (
            <div className="error_msg">{validationErrors.phone}</div>
          )}

          {serverError && <div className="error_msg">{serverError}</div>}
          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
