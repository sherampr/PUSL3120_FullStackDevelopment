const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required:true
    },
    amenities: [String]
});

module.exports = mongoose.model('RoomType', roomTypeSchema);
