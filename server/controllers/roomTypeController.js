const RoomType = require('../models/roomTypeModel')

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
    const { typeName, amenities, typeDescription, roomCapacity } = req.body;
    try {
        const roomType = await RoomType.create({ typeName, amenities, typeDescription, roomCapacity });
        res.status(200).json(roomType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

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