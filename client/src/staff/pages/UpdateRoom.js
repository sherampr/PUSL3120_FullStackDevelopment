import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/NewRoom.css'
import '../styles/UpdateRoom.css'

const UpdateRoom = ({ match }) => {
    const navigate = useNavigate();

  const [roomType, setRoomType] = useState({
    typeName: '',
    typePrice: '',
    amenities: '',
    typeDescription: '',
    roomCapacity: '',
    typeImages: []
  });


  const { id } = useParams() // Assuming you're using React Router

  useEffect(() => {

    

    const fetchRoomType = async () => {
      try {
        const response = await axios.get(`/api/roomtypes/${id}`);
        const data = response.data;

        setRoomType({
          typeName: data.typeName,
          typePrice: data.typePrice,
          amenities: data.amenities.join(','),
          typeDescription: data.typeDescription,
          roomCapacity: data.roomCapacity,
          typeImages: data.typeImages.map(img => img.url).join(',')
        });
      } catch (err) {
        console.error(err);
        alert('Error fetching room data');
      }
    };

    fetchRoomType();
  }, [id]);

  const handleChange = (e) => {
    setRoomType({ ...roomType, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { typeName, typePrice, amenities, typeDescription, roomCapacity, typeImages } = roomType;
  
    const updatedRoomType = {
      typeName,
      typePrice,
      amenities: amenities.split(',').map(item => item.trim()), // split and trim amenities
      typeDescription,
      roomCapacity: parseInt(roomCapacity, 10), // ensure roomCapacity is a number
      imageUrls: typeImages.split(',').map(url => ({ url, isMain: false })) // map each URL to an object
    };
  
    // Set the first image as main if exists
    if (updatedRoomType.imageUrls.length > 0) {
      updatedRoomType.imageUrls[0].isMain = true;
    }
  
    try {
      await axios.put(`/api/roomtypes/${id}`, updatedRoomType);
      alert('Room Type Updated Successfully');
      navigate('/staff');
      // Optionally, redirect or fetch updated data here
    } catch (err) {
      console.error(err);
      alert('Error Updating Room Type');
    }
  };
  

  return (
    <div className='updateRoom'>
      <div className="container">
        <h1>Update Room Type</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="typeName">Room Type Name</label>
            <textarea
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
            <textarea
              type="number"
              id="typePrice"
              name="typePrice"
              value={roomType.typePrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="amenities">Amenities (comma-separated)</label>
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
          <div>
            <label htmlFor="roomCapacity">Room Capacity</label>
            <textarea
              type="number"
              id="roomCapacity"
              name="roomCapacity"
              value={roomType.roomCapacity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="typeImages">Room Type Images (comma-separated URLs)</label>
            <textarea
              id="typeImages"
              name="typeImages"
              value={roomType.typeImages}
              onChange={handleChange}
            />
          </div>
          <button className='updateBtn' type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;
