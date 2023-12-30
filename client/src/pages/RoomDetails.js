import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import '../styles/RoomDetails.css'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
 <div class="input__group" onClick={onClick} ref={ref}>
    <input type="text" value={value} readOnly />
    <label>{value ? '' : 'Select Date'}</label>
 </div>
));

const RoomDetails = () => {
    const { id } = useParams()
    const [roomTypes, setroomTypes] = useState(null)
    const [checkInDate, setCheckInDate] = useState(null);
    const navigate = useNavigate();

 

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
            const response = await fetch(`/api/roomtypes/${id}`)
            const json = await response.json()

            if (response) {
                setroomTypes(json)
            }
        }
        fetchroomTypes()
    }, [id])

    if (!roomTypes) {
        return <div>Loading...</div>
    }
    const handleBooking = () => {
      navigate('/booking-confirmation', { state: { checkInDate, checkOutDate } });
  };
  
    return (
      <div className='RoomDetails'>
        <section class="section__container header__container">
             <h2 class="section__header">{roomTypes.typeName}</h2>
      <div class="header__image__container">
        <div class="header__content">
        </div>
        <div class="booking___container">
          <form>
           
          <div class="form__group">
 <div class="input__group">
    <DatePicker
      selected={checkInDate}
      onChange={(date) => setCheckInDate(date)}
      dateFormat="MMMM d, yyyy"
      customInput={<CustomInput />}
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
 customInput={<CustomInput />}
/>
 </div>
 <p>Check-out date</p>
</div>
          </form>
          {roomTypes.roomCapacity > 0 ? 
          <div className="BookButton" onClick={handleBooking}><p>Book Now</p></div>
          : 
          <div class="BookButton"><p>Rooms unavailable</p></div>}
        </div>
      </div>
    </section>

    <section class="section__container">
      <div class="reward__container">
      <h2>Room Cost Per Night: {roomTypes.typePrice} LKR</h2>
        <p>{roomTypes.typeDescription}</p>
      </div>
    </section>


    </div>

    )
}

export default RoomDetails