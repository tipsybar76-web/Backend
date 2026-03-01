const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const Visit = require("../models/Visits");
const Admin = require("../models/Admin");

// Temporary Admin Data (Ideally store in DB)
const adminData = {
  email: process.env.ADMIN_EMAIL,
  passwordHash: process.env.ADMIN_PASSWORD_HASH,
};

// =============== ADMIN PASSWORD ==============
exports.changePassword = async (req, res) => {
  console.log("Hi from change passowrd block");
  try {
    const { currentPassword, newPassword } = req.body;
    console.log(
      "The currentPassword and newPassword : ",
      currentPassword,
      newPassword
    );
    const admin = await Admin.findById(req.adminId);
    console.log("The admin name is : ", admin);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);

    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN LOGIN =================
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check Email
    if (email !== adminData.email) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Compare Password with Hash
    const isMatch = await bcrypt.compare(password, adminData.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DASHBOARD STATS =================
exports.getDashboardStats = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const reachHistory = await Visit.find().sort({ date: 1 }).limit(30);

    const daily = reachHistory[reachHistory.length - 1]?.count || 0;
    const weekly = reachHistory
      .slice(-7)
      .reduce((acc, curr) => acc + curr.count, 0);
    const monthly = reachHistory.reduce((acc, curr) => acc + curr.count, 0);

    res.json({
      bookings,
      reachHistory: reachHistory.map((v) => ({
        date: v.date.slice(5),
        count: v.count,
      })),
      summary: { daily, weekly, monthly },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
