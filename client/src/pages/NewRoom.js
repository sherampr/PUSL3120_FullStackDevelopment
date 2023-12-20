import React, { useState } from 'react';
import '../styles/NewRoom.css'

const NewRoom = () => {
    const [roomType, setRoomType] = useState({
        typeName: '',
        typePrice: '',
        amenities: [],
        typeDescription: '',
        roomCapacity: '',
        typeImages: [],
     });
    
     const handleChange = (e) => {
        setRoomType({ ...roomType, [e.target.name]: e.target.value });
     };
    
     const handleSubmit = (e) => {
        e.preventDefault();
        console.log(roomType);
        // You can handle the submission logic here.
     };

     const addImage = () => {
        const newImage = prompt('Enter the image URL');
        if (newImage) {
            setRoomType({ ...roomType, typeImages: [...roomType.typeImages, newImage] });
        }
     };
    
    
     return (
        <div className='newroom'>
        <div className="container">
          <h1>Add a Room Type</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div>
                <label htmlFor="typeName">Room Type Name</label>
                <input
                  type="text"
                  id="typeName"
                  name="typeName"
                  value={roomType.typeName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="typePrice">Room Type Price</label>
                <input
                  type="number"
                  id="typePrice"
                  name="typePrice"
                  value={roomType.typePrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label htmlFor="amenities">Amenities</label>
                <textarea
                  id="amenities"
                  name="amenities"
                  value={roomType.amenities}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="typeDescription">Room Type Description</label>
                <textarea
                  id="typeDescription"
                  name="typeDescription"
                  value={roomType.typeDescription}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label htmlFor="roomCapacity">Room Capacity</label>
                <input
                  type="number"
                  id="roomCapacity"
                  name="roomCapacity"
                  value={roomType.roomCapacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="typeImages">Room Type Images</label>
                <textarea
                 id="typeImages"
                 name="typeImages"
                 value={roomType.typeImages}
                 onChange={handleChange}
                />
              </div>
              <button type="button" onClick={addImage}>Add Image</button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
     );
};

export default NewRoom;