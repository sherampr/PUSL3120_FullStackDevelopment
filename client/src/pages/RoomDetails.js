import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/RoomDetails.css";
// import io from 'socket.io-client';

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
    //    const socket = io('http://localhost:3001', { transports: ['websocket'] });

    //   socket.on('connect', () => {
    //       console.log('Connected to WebSocket server');
    //   });
    //   socket.on('connect_error', (error) => {
    //     console.error('Connection Error:', error);
    // });

    // socket.on('roomAvailabilityUpdate', (data) => {
    //   console.log('Room availability update received:', data);
    //     if (data.roomId === id) { // Check if the update is for the current room
    //         setroomTypes(prevState => ({
    //             ...prevState,
    //             roomAvailability: data.newAvailability,
    //         }));
    //     }
    // });

    const fetchroomTypes = async () => {
      const response = await fetch(`/api/roomtypes/${id}`);
      const json = await response.json();

      if (response) {
        setroomTypes(json);
      }
    };
    fetchroomTypes();

    //   return () => {
    //     socket.off('roomAvailabilityUpdate');
    //     // socket.disconnect();
    // };
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
            </form>
            {isLoggedIn ? (
              roomTypes.roomAvailability > 0 ? (
                <div className="BookButton" onClick={handleBooking}>
                  <p>Book Now</p>
                </div>
              ) : (
                <div class="BookButton">
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
    </div>
  );
};

export default RoomDetails;
