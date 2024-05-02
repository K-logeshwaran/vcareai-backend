const mongoose = require("mongoose");

const EmbededSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmbededLinks", EmbededSchema);
