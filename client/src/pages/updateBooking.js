import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateBooking = () => {
  const navigate=useNavigate();
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState({
    
    checkinDate: new Date(),
    checkoutDate: new Date(),
    
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!bookingId) {
          // Handle the case where bookingId is undefined (e.g., redirect to an error page)
          return;
        }
  
        const response = await axios.get(`/api/bookings/${bookingId}`);
        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
  
    fetchBookingDetails();
  }, [bookingId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Validation: Check if checkinDate is before checkoutDate
      if (bookingDetails.checkinDate >= bookingDetails.checkoutDate) {
        // Display an error message or handle the validation error appropriately
        console.error("Checkin date should be before checkout date");
        return;
      }
  
      await axios.put(`/api/bookings/${bookingId}`, bookingDetails);
      // Handle success or redirect the user
      navigate("/UserDetails");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleUpdate}>
        

        <label>Enter checkinDate</label>
        <ReactDatePicker
          selected={new Date(bookingDetails.checkinDate)}
          onChange={(date) => setBookingDetails((prevDetails) => ({ ...prevDetails, checkinDate: date }))}
        />

        <label>Enter checkoutDate</label>
        <ReactDatePicker
          selected={new Date(bookingDetails.checkoutDate)}
          onChange={(date) => setBookingDetails((prevDetails) => ({ ...prevDetails, checkoutDate: date }))}
        />

        
        <button type="submit" >Update</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
