import React, { useState } from "react";
import "../CSS pages/Loginpage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(credentials);
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
