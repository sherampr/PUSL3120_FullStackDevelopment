const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required:true
    },
    amenities: [String],
    typeDescription: {
        type: String,
        required:true
    },
    roomCapacity: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('RoomType', roomTypeSchema);