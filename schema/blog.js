const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uploaded_by: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  cover_image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Array of strings for categories
    required: true,
  },
  meta_desc: {
    type: String,
    required: true,
  },
  meta_keywords: {
    type: [String], // Array of strings for meta keywords
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
