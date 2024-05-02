const express = require("express");
const router = express.Router();
const multer = require("multer");

const { jwtValidateUser } = require("../commons");
const userRegistrationSchema = require("../schema/userRegistrationSchema");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

// Route for updating and storing PDF files

router.post(
  "/updatePdf/:userId",
  [
    jwtValidateUser,
    upload.fields([
      { name: "pancardPDF", maxCount: 1 },
      { name: "aadharCardPDF", maxCount: 1 },
    ]),
  ],
  async (req, res) => {
    jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
      try {
        const {email} = data;

        // Check if the user exists
        const user = await userRegistrationSchema.findOne({
            email
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Update Pan card details
        if (req.files && req.files["pancardPDF"]) {
          const pancardPDF = req.files["pancardPDF"][0];
          user.pancardPDF.data = pancardPDF.buffer;
          user.pancardPDF.contentType = pancardPDF.mimetype;
        }

        // Update Aadhar card details
        if (req.files && req.files["aadharCardPDF"]) {
          const aadharCardPDF = req.files["aadharCardPDF"][0];
          user.aadharCardPDF.data = aadharCardPDF.buffer;
          user.aadharCardPDF.contentType = aadharCardPDF.mimetype;
        }

        // Update other fields if needed
        user.panNumber = req.body.panNumber || user.panNumber;
        user.aadharNumber = req.body.aadharNumber || user.aadharNumber;

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: "PDF files updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  }
);

module.exports = router;
