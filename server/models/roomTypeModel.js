const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: String,
    contentType: String,
    isMain: Boolean
});

const roomTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required:true
    },
    typePrice: {
        type: Number,
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
    },
    typeImages: [ImageSchema]
}, {
    timestamps: true
});

// Ensure that at least one image with isMain set to true exists for each room type
roomTypeSchema.pre('save', function(next) {
    if (this.typeImages.some(img => img.isMain)) {
        next();
    } else {
        const imageWithIsMain = this.typeImages.find(img => img.url);
        if (imageWithIsMain) {
            imageWithIsMain.isMain = true;
            next();
        } else {
            next(new Error('No images provided for the room type'));
        }
    }
});

module.exports = mongoose.model('RoomType', roomTypeSchema);