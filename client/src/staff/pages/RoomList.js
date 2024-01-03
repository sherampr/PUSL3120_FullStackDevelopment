import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RoomList.css'
import { Link } from 'react-router-dom';
function RoomList() {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/roomtypes');
                setRoomTypes(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, []);

    const handleUpdate = (id) => {
        // Logic to handle update
        console.log('Update', id);
    }

    const handleDelete = async (id) => {
        // Confirm before deleting
        const confirmDelete = window.confirm('Are you sure you want to delete this room type?');
        if (confirmDelete) {
            try {
                // Send DELETE request to your server
                await axios.delete(`/api/roomtypes/${id}`);
    
                // Filter out the deleted room type from the state
                const updatedRoomTypes = roomTypes.filter(roomType => roomType._id !== id);
                setRoomTypes(updatedRoomTypes);
    
                console.log(`Room type with id ${id} deleted successfully`);
            } catch (error) {
                console.error('Error deleting room type: ', error);
            }
        } else {
            alert('Deletion cancelled');
        }
    }
    

    return (
        <div className='roomlist'>
        <div className="ListContainer">
            <h2>Room Types </h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">Type Name</div>
                    <div className="col col-2">Type Price</div>
                    <div className="col col-3">Room Capacity</div>
                    <div className="col col-4">Actions</div>
                </li>
                {roomTypes.map(roomType => (
 <Link to={`/room-details/${roomType._id}`}>
                    <li key={roomType._id} className="table-row">
                        
                        <div className="col col-1" data-label="Type Name">{roomType.typeName}</div>
                       
                        <div className="col col-2" data-label="Type Price">{roomType.typePrice}</div>
                        <div className="col col-3" data-label="Room Capacity">{roomType.roomCapacity}</div>
                        <div className="col col-4" data-label="Actions">
                        <Link to={`/updateroom/${roomType._id}`}>
                            <button className="updateBtn" onClick={() => handleUpdate(roomType._id)}>Update</button>
                            </Link>
                            <button className="deleteBtn" onClick={() => handleDelete(roomType._id)}>Delete</button>
                        </div>
                    </li>
                    </Link>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default RoomList;
