const mongoose = require("mongoose");



const ImageSchema = new mongoose.Schema({
  url: String,
  contentType: String,
  isMain: Boolean,
});

const roomTypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
    },
    typePrice: {
      type: Number,
      required: true,
    },
    amenities: [String],
    typeDescription: {
      type: String,
      required: true,
    },
    roomCapacity: {
      type: Number,
      required: true,
    },
    roomAvailability: {
      type: Number,
      required: true,
    },
    typeImages: [ImageSchema]
}, {
    timestamps: true
},
{
    displayInHome: false
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
// Add roomAvailability field to the schema
roomTypeSchema.add({ roomAvailability: Number });

// Ensure roomAvailability is initialized properly
roomTypeSchema.pre('save', function(next) {
  if (this.isNew) {
    this.roomAvailability = this.roomCapacity;
  }
  next();
});

module.exports = mongoose.model("RoomType", roomTypeSchema);
