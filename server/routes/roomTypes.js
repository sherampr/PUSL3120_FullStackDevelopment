const express = require('express');
const router = express.Router()
const RoomType = require('../models/roomTypeModel')

//Post a new roomType
router.post('/', async (req,res)=>{

    const { typeName, amenities } = req.body;
    console.log(req.body)

    try {
        // Save the new room type to the database
        const roomType = await RoomType.create({typeName,amenities});
        res.status(200).json(roomType);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})

router.put('/:id', (req,res)=>{
    res.json({mssg:'Update a roomType'})
})

module.exports=router