import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("/api/users", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 401) {
            navigate("/login");
          }
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <h1>User Details</h1>
      <p>
        Name: {data.firstName} {data.lastName}
      </p>
      <p>Email: {data.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDetails;
