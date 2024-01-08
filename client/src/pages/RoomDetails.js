import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/RoomDetails.css";
 import io from 'socket.io-client';

const CustomInput = forwardRef(({ value, onClick, isDisabled }, ref) => (
  <div className="input__group" onClick={onClick} ref={ref}>
    <input type="text" value={value} readOnly />
    <label>{value ? "" : isDisabled ? "Unavailable" : "Select Date"}</label>
  </div>
));

const RoomDetails = () => {
  const { id } = useParams();
  const [roomTypes, setroomTypes] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;
  const [roomAvailability, setRoomAvailability] = useState(0);

  const handleLoginRedirect = () => {
    navigate("/Login");
  };

  const isWeekdayBlocked = (date) => {
    if (checkInDate) {
      return date < checkInDate;
    }
    return false;
  };

  const handleCheckOutDateChange = (date) => {
    if (date < checkInDate) {
      setCheckOutDate(checkInDate);
    } else {
      setCheckOutDate(date);
    }
  };

  const [checkOutDate, setCheckOutDate] = useState(null);

  useEffect(() => {
    const fetchroomTypes = async () => {
      try {
        const response = await fetch(`/api/roomtypes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch room types');
        }
        const json = await response.json();
  
        setroomTypes(json);
        // Set initial room availability based on fetched data
        setRoomAvailability(json.roomAvailability);
      } catch (error) {
        console.error('Error fetching room types:', error);
        // Handle the error appropriately
      }
    };
  
    fetchroomTypes();
  }, [id]); 

  const [Reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("/api/reviews");
      const json = await response.json();

      if (response.ok) {
        setReviews(json);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);

  
    socket.on('roomAvailabilityUpdate', (data) => {
      if (data.roomId === id) {
        setRoomAvailability(data.newAvailability);
      }
    });
  
    return () => {
      socket.off('roomAvailabilityUpdate');
      socket.disconnect();
    };
  }, [id]);
  

  if (!roomTypes) {
    return <div>Loading...</div>;
  }
  const handleBooking = () => {
    navigate("/booking-confirmation", {
      state: {
        checkInDate,
        checkOutDate,
        roomType: roomTypes.typeName,
        price: roomTypes.typePrice,
      },
    });
  };

  //Disable date pickers if room capacity is 0
  const isDatePickerDisabled = roomTypes.roomAvailability === 0;

  const mainImageUrl =
    roomTypes.typeImages.find((img) => img.isMain)?.url || "default_image_url";

  const midPoint = Math.ceil(roomTypes.amenities.length / 2);
  const leftAmenities = roomTypes.amenities.slice(0, midPoint);
  const rightAmenities = roomTypes.amenities.slice(midPoint);

  return (
    <div className="RoomDetails">
      <section class="section__container header__container">
        <h2 class="section__header">{roomTypes.typeName}</h2>
        <div
          className="room__image__container"
          style={{ backgroundImage: `url(${mainImageUrl})` }}
        >
          <div class="header__content"></div>
          <div class="booking___container">
            <form>
              <div class="form__group">
                <div class="input__group">
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    dateFormat="MMMM d, yyyy"
                    customInput={
                      <CustomInput isDisabled={isDatePickerDisabled} />
                    }
                    disabled={isDatePickerDisabled}
                  />
                </div>
                <p>Check-in date</p>
              </div>


             
              <div class="form__group">
                <div class="input__group">
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => handleCheckOutDateChange(date)}
                    dateFormat="MMMM d, yyyy"
                    isWeekdayBlocked={isWeekdayBlocked}
                    customInput={
                      <CustomInput isDisabled={isDatePickerDisabled} />
                    }
                    disabled={isDatePickerDisabled}
                  />
                </div>
                <p>Check-out date</p>
              </div>
              <div class="form__group">

              <p>{roomAvailability} rooms available</p>
</div>

            </form>
            {isLoggedIn ? (
  roomTypes.roomAvailability > 0 ? (
    <div className="BookButton" onClick={handleBooking}>
      <p>Book Now</p>
    </div>
  ) : (
    <div className="BookButton">
      <p>Rooms unavailable</p>
    </div>
  )
) : (
  <div className="BookButton" onClick={handleLoginRedirect}>
    <p>Login Now</p>
  </div>
)}
          </div>
        </div>
      </section>

      <section class="section__container">
        <div class="reward__container">
          <h2>Room Cost Per Night: {roomTypes.typePrice} LKR</h2>
          <p>{roomTypes.typeDescription}</p>
        </div>
      </section>

      <section class="section__container">
        <div class="reward__container">
          <h2>Amenities</h2>
          <div className="amenities">
            <div class="amenities__left">
              {leftAmenities.map((amenity, index) => (
                <p key={index}>{amenity}</p>
              ))}
            </div>
            <div class="amenities__right">
              {rightAmenities.map((amenity, index) => (
                <p key={index}>{amenity}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section class="customer">
        <div class="section__container customer__container">
          <h2 class="section__header">What our Guests say</h2>
          <div class="customer__grid">
            {Reviews &&
              Reviews.filter((Review) => Review.room === roomTypes._id).map(
                (Review) => (
                  <div class="customer__card" key={Review._id}>
                    <img src="assets/customer-1.jpg" alt="customer" />
                    <p>{Review.comment}</p>
                  </div>
                )
              )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetails;
