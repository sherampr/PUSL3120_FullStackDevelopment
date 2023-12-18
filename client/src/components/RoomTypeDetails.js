import React from 'react';
<<<<<<< Updated upstream

const RoomTypeDetails = ({roomType})=>{
    return(
        <div className="room-details">
            <h4>{roomType.typeName}</h4>
            <p>{roomType.typeDescription}</p>
=======
import '../styles/RoomPageStyles.css'

const RoomTypeDetails = ({roomType})=>{
    const mainImage = Array.isArray(roomType.typeImages) ? 
                      roomType.typeImages.find(image => image.isMain) : 
                      null;

       const cardStyle = mainImage ? 
                      { backgroundImage: `url(${mainImage.url})`, backgroundSize: 'cover' } : 
                      { backgroundColor: '#f0f0f0' }; // Fallback background color
    return(
        <div className="card-grid-spac">
        <div className="num">
        <div className="card" style={cardStyle}>
            <h4>{roomType.typeName}</h4>
            {/* {mainImage && (
                        <img src={mainImage.url} alt={roomType.typeName} />
                    )} */}
            {/* <p>{roomType.typeDescription}</p>
>>>>>>> Stashed changes
            <p>Room Capacity: {roomType.roomCapacity}</p>
            <p>Amenities:</p>
            <ul>
                {roomType.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
<<<<<<< Updated upstream
            </ul>
=======
            </ul> */}
            </div>
        </div>
>>>>>>> Stashed changes
        </div>
    )
}

export default RoomTypeDetails;