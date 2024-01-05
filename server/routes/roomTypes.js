const express = require('express');
const router = express.Router()
const {
    getAllRoomTypes,
    getRoomType,
    createRoomType,
    deleteRoomType,
    updateRoomType
} = require('../controllers/roomTypeController')

//Get all room Types
router.get('/',getAllRoomTypes)

//Get a Single room type
router.get('/:id',getRoomType)

//Post a new roomType
router.post('/', createRoomType)

//delete a room type
router.delete('/:id',deleteRoomType)

//Update a room type
router.put('/:id',updateRoomType)

module.exports=router