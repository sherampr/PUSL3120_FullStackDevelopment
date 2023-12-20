import React, { useState } from "react";
import "../CSS pages/Signuppage.css";
import axios from "axios";
const SignupPage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the user data to the server's /api/register route
      const response = await axios.post("/api/register", { user });

      // Check the response for success
      if (response.status === 201) {
        console.log("User registered successfully");
        // You can redirect or perform other actions upon successful registration
      }
    } catch (error) {
      console.log("Error registering user:", error);
      // Handle the error as needed
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
            placeholder=" Enter your first name"
            onChange={handleChange}
          />
          <h4>LastName</h4>
          <input
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            onChange={handleChange}
          />
          <h4>Email address </h4>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email address"
            onChange={handleChange}
          />
          <h4>Password</h4>
          <input
            name="password"
            type="password"
            placeholder=" Enter your Password"
            onChange={handleChange}
          />
          <h4>ConfirmPassword</h4>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
          />
          <h4>Telphone number</h4>
          <input
            name="telphone"
            type="string"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
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
