const express = require('express');

const router = express.Router()

//Get data on every room
router.get('/',(req,res)=>{
    res.json({mssg:'Get all Rooms'})
})

//Get data on a single room
router.get('/:id',(req,res)=>{
    res.json({mssg:'Get single Room'})
})

//Post a new room
router.post('/', (req,res)=>{
    res.json({mssg:'Post a new room'})
})

router.delete('/:id', (req,res)=>{
    res.json({mssg:'Delete a room'})
})

//Update a room
router.put('/:id', (req,res)=>{
    res.json({mssg:'Update a room'})
})



module.exports=router