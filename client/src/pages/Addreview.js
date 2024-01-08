import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Userupdate.css";
import { useNavigate } from "react-router-dom";

const Addreview = () => {
  const [formData, setFormData] = useState({
    user: "",
    room: "",
    rating: "",
    comment: "",
  });
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
          setFormData({
            user: res.data._id,
          });
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post("/api/reviews", formData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then(() => {
        navigate("/UserDetails");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="room">Room:</label>
        <input
          type="text"
          id="room"
          name="room"
          value={formData.room}
          onChange={handleChange}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Addreview;
