import React from 'react';
<<<<<<< HEAD

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
>>>>>>> parent of 9060925 (Revert "Room Pages,controllers,model updated")
            <p>Room Capacity: {roomType.roomCapacity}</p>
            <p>Amenities:</p>
            <ul>
                {roomType.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
<<<<<<< HEAD
            </ul>
=======
            </ul> */}
            </div>
        </div>
>>>>>>> parent of 9060925 (Revert "Room Pages,controllers,model updated")
        </div>
    )
}

export default RoomTypeDetails;