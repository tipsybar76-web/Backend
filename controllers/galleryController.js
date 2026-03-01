const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// ================= UPLOAD IMAGE =================
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newImage = await Gallery.create({
      title: req.body.title,
      imageUrl: req.file.path,
      publicId: req.file.filename, // Cloudinary public ID
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

// ================= GET ALL IMAGES =================
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

// ================= DELETE IMAGE =================
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from MongoDB
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
