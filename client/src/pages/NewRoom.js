import React, { useState } from 'react';
import '../styles/NewRoom.css'
import axios from 'axios';

const NewRoom = () => {
  const [roomType, setRoomType] = useState({
    typeName: '',
    typePrice: '',
    amenities: '',
    typeDescription: '',
    roomCapacity: '',
    typeImages: ''
});

const handleChange = (e) => {
    setRoomType({ ...roomType, [e.target.name]: e.target.value });
};

const addImage = () => {
    setRoomType({ ...roomType, typeImages: [...roomType.typeImages, ''] });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const { typeName, typePrice, amenities, typeDescription, roomCapacity, typeImages } = roomType;

    const newRoomType = {
        typeName,
        typePrice,
        amenities: amenities.split(','),
        typeDescription,
        roomCapacity,
        imageUrls: typeImages.split(',').map((url, index) => ({ url, isMain: index === 0 }))
    };

    try {
        await axios.post('/api/roomtypes', newRoomType);
        alert('Room Type Added Successfully');
        setRoomType({
            typeName: '',
            typePrice: '',
            amenities: '',
            typeDescription: '',
            roomCapacity: '',
            typeImages: ''
        });
    } catch (err) {
        console.error(err);
        alert('Error Adding Room Type');
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
              <div className="row">
              <div>
                <label htmlFor="typeImages">Room Type Images</label>
                <textarea
                 id="typeImages"
                 name="typeImages"
                 value={roomType.typeImages}
                 onChange={handleChange}
                />
              </div></div>
              {/* <button type="button" className='addBtn' onClick={addImage}>Add Image</button> */}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
     );
};

export default NewRoom;