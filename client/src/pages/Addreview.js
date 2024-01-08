import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Userupdate.css";
import { useNavigate } from "react-router-dom";

const Addreview = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    room: "",
    rating: "",
    comment: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/api/users", {
          headers: { "x-auth-token": token },
        });
        setFormData((prev) => ({
          ...prev,
          customerName: `${response.data.firstName} ${response.data.lastName}`,
          customerEmail: response.data.email,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("/api/reviews", formData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      navigate("/UserDetails");
      window.location.reload();
    } catch (err) {
      console.error(
        "Error submitting review:",
        err.response ? err.response.data : err
      );
    }
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
          value={formData.comment}
          onChange={handleChange}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Addreview;
