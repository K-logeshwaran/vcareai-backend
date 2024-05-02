const express = require('express');
const router = express.Router();
const Link = require('../schema/embededLinks'); // Update the path accordingly


const OPTIONS = {
    YOUTUBE_VIDEO: "youtube-link",
    PODCAST: "podcast-link"
}


// Create a new blog entry
router.post('/', async (req, res) => {
  try {
    const { link, type } = req.body;
    console.log(req.body);
    const newLink = new Link({ link, type });
    const savedLink = await newLink.save();
    res.json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Link entries
router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:type', async (req, res) => {
    try {
      const { type } = req.params;
      const links = await Link.find({ type });
      res.json(links);  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get a specific Link entry by ID
router.get('/:id', async (req, res) => {
  try {
    const Link = await Link.findById(req.params.id);
    if (!Link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(Link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific Link entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const { link, type } = req.body;
    const updatedLink = await Link.findByIdAndUpdate(req.params.id, { link, type }, { new: true });
    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific Link entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(req.params.id);
    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
