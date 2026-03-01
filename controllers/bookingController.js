const Booking = require("../models/Booking");

// ================= CREATE BOOKING =================
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};
