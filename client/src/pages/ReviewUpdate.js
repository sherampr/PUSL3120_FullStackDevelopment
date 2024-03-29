import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Userupdate.css";
import { useParams, useNavigate } from "react-router-dom";

const ReviewUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`/api/reviews/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
        .then((res) => {
          setFormData({
            comment: res.data.comment,
            rating: res.data.rating,
          });
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(`/api/reviews/${id}`, formData, {
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
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={formData.comment}
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ReviewUpdate;
