const express = require("express");
const router = express.Router();
const path = require("path");
const { mkdirSync, existsSync } = require("fs");
const BlogSchema = require("../schema/blog");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let imgPt = path.join("uploads", "blogs", "images");
    mkdirSync(imgPt, { recursive: true });
    cb(null, imgPt); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype.split("/"));
    //cb(null, Date.now() + "-" + file.originalname); // Generate unique filenames
    cb(null, req.params.file + "." + file.mimetype.split("/")[1]); // Generate unique filenames
    req.myFilePath = path.join(
      __dirname,
      "..",
      "uploads",
      "blogs",
      "images",
      req.params.file + "." + file.mimetype.split("/")[1]
    );
    req.fileName = req.params.file + "." + file.mimetype.split("/")[1];
  },
});

const upload = multer({ storage: storage, createParentPath: true });

// EndPoints for handling cover image

router.post("/upload/:file", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log(req.file);
  console.log(req.myFilePath);
  //const link = `<a href="${req.protocol}://${req.hostname}:${process.env.PORT}/blog/coverImage/${req.fileName}">${req.protocol}://${req.hostname}:${process.env.PORT}/blog/coverImage/${req.fileName}</a>`;
  const link = `${req.protocol}://${req.hostname}:${process.env.PORT}/blog/coverImage/${req.fileName}`;
  console.log(link);
  res.send(link);
});

router.get("/coverImage/:imageName", (req, res) => {
  try {
    const { imageName } = req.params;
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      "blogs",
      "images",
      imageName
    );

    // Check if the image exists
    if (existsSync(imagePath)) {
      // Send the image if found
      res.sendFile(imagePath);
    } else {
      // Send 404 if image not found
      res.status(404).send("Image not found");
    }
  } catch (error) {
    console.error("Error serving image:", error);
    res.status(500).send("Internal server error");
  }
});

//Endpoints for handling Blogs

router.get("/get", async (req, res) => {
  try {
    // Query all blogs from the database
    const blogs = await BlogSchema.find();

    // Check if there are no blogs found
    if (blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found" });
    }

    // If blogs are found, return them as JSON response
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Check if the blog exists
    const blog = await BlogSchema.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/upload", async (req, res) => {
  try {
    const {
      title,
      uploaded_by,
      time,
      cover_image,
      caption,
      category,
      meta_desc,
      meta_keywords,
      content,
    } = req.body;

    // Assuming req.body contains the necessary data for the blog
    const newBlog = new BlogSchema({
      title,
      uploaded_by,
      time,
      cover_image,
      caption,
      category,
      meta_desc,
      meta_keywords,
      content,
    });

    // Save the new blog to the database
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog uploaded successfully", blog: newBlog });
  } catch (error) {
    console.error("Error uploading blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/content/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Check if the blog exists
    const blog = await BlogSchema.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete the blog
    await BlogSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const {
      title,
      uploaded_by,
      time,
      cover_image,
      caption,
      category,
      meta_desc,
      meta_keywords,
      content,
    } = req.body;
    
    console.log("lokffff",content);

    // Check if the blog exists
    const blog = await BlogSchema.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Update the blog with new data
    blog.title = title;
    blog.uploaded_by = uploaded_by;
    blog.time = time;
    blog.cover_image = cover_image;
    blog.caption = caption;
    blog.category = category;
    blog.meta_desc = meta_desc;
    blog.meta_keywords = meta_keywords;
    blog.content = content;

    // Save the updated blog to the database
    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog: blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
