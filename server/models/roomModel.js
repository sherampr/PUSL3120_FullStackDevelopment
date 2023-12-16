const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required:true
    },
    roomType: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'RoomType' ,
        required:true
    },
    price: Number,
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Booked', 'Under Maintenance'],
        default: 'Available',
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Room', roomSchema);
