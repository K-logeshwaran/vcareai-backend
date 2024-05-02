const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Event = require("../schema/gallery"); // Assuming you have a mongoose Event model
const path = require("path");
const fs = require("fs")
const router = express.Router();

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for image uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename for uploaded image
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Route for image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Extracting event name and image description from request body
    const { eventName, imageDescription } = req.body;

    // Constructing the image path
    const imagePath = req.file.path;

    // Creating a new event object
    const newEvent = new Event({
      eventName,
      imageDescription,
      imagePath,
    });

    // Saving the event object to MongoDB
    await newEvent.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all images with payload data
router.get("/images", async (req, res) => {
  try {
    const events = await Event.find({}, "eventName imageDescription imagePath");

    // Append image URLs to the response data
    const eventsWithImages = events.map((event) => {
      const imageData = {
        eventName: event.eventName,
        imageDescription: event.imageDescription,
        imagePath: event.imagePath,
        imageURL: `http://localhost:3134/gallery/images/${event._id}`, // URL to retrieve the image
      };
      return imageData;
    });

    res.json(eventsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get individual image by ID
router.get("/images/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Read the image file
    const imagePath = path.join(__dirname, "..", event.imagePath);
    const imageStream = fs.createReadStream(imagePath);
    imageStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
