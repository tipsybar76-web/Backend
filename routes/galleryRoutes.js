const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/galleryController");

// Upload image
router.post("/", upload.single("image"), uploadImage);

// Get all images
router.get("/", getImages);

// Delete image
router.delete("/:id", deleteImage);

module.exports = router;
