import React, { useState } from "react";
import "../CSS pages/Loginpage.css";
import axios from "axios";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
        backgroundImage: `url("https://oceanjar-new.s3.ap-south-1.amazonaws.com/como_uma_canggu_699738f83d.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login your Account</h2>
          <h4>email</h4>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email here"
            onChange={handleChange}
          />
          <h4>password</h4>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password here"
            onChange={handleChange}
          />
          {error && <div className={"error_msg"}>{error}</div>}
          <button type="submit">Login Here</button>
          <p>
            Create an account? <a href="/signup">Sign-Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
