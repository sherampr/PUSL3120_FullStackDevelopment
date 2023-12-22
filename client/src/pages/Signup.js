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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/testing/users";
      const { data: res } = await axios.post(url, { data });
      navigate("/Login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
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
            name="phone"
            type="string"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
          {error && <div className={"error_msg"}>{error}</div>}
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
