import React from 'react';
import '../styles/RoomPageStyles.css'
import { Link } from 'react-router-dom';

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
        <Link to={`/room-details/${roomType._id}`}>
        <div className="card" style={cardStyle}>
            <h4>{roomType.typeName}</h4>
            {/* {mainImage && (
                        <img src={mainImage.url} alt={roomType.typeName} />
                    )} */}
            {/* <p>{roomType.typeDescription}</p>
            <p>Room Capacity: {roomType.roomCapacity}</p>
            <p>Amenities:</p>
            <ul>
                {roomType.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
            </ul> */}
            </div>
            </Link>
        </div>
        </div>
    )
}

export default RoomTypeDetails;