const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const visitRoutes = require("./routes/visitRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Route Middlewares
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/track-visit", visitRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);

// Global Error Middleware
app.use(errorHandler);

module.exports = app;
