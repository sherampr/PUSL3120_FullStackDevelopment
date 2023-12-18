import React from 'react';

const RoomTypeDetails = ({roomType})=>{
    return(
        <div className="room-details">
            <h4>{roomType.typeName}</h4>
            <p>{roomType.typeDescription}</p>
            <p>Room Capacity: {roomType.roomCapacity}</p>
            <p>Amenities:</p>
            <ul>
                {roomType.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
            </ul>
        </div>
    )
}

export default RoomTypeDetails;