const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  imageDescription: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
