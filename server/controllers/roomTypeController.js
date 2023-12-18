const RoomType = require('../models/roomTypeModel')
const mongoose = require('mongoose')
//Get all room Types
const getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.find();
        res.status(200).json(roomTypes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//Get a single room type
const getRoomType = async (req, res) => {
    const { id } = req.params;

    

    try {
        const roomType = await RoomType.findById(id);
        res.status(200).json(roomType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//Create a new room type
const createRoomType = async (req, res) => {
    const { typeName,typePrice, amenities, typeDescription, roomCapacity, imageUrls } = req.body;
    
    // Convert the structured URLs to ImageSchema format
    let typeImages = imageUrls.map(image => ({
        url: image.url,
        contentType: 'image/jpeg', // Set a default or derive from URL
        isMain: image.isMain || false // Set isMain based on the provided value
    }));

    try {
        const roomType = await RoomType.create({ typeName,typePrice, amenities, typeDescription, roomCapacity, typeImages });
        res.status(200).json(roomType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


//delete a room type
const deleteRoomType = async (req, res) => {
    const { id } = req.params;
    try {
        const roomType = await RoomType.findByIdAndDelete(id);
        res.status(200).json(roomType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//update a room type
const updateRoomType = async (req, res) => {
    const { id } = req.params;
    const { typeName, amenities, typeDescription, roomCapacity } = req.body;
    try {
        const roomType = await RoomType.findByIdAndUpdate(id, { typeName, amenities, typeDescription, roomCapacity }, { new: true });
        res.status(200).json(roomType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getAllRoomTypes,
    getRoomType,
    createRoomType,
    deleteRoomType,
    updateRoomType
}