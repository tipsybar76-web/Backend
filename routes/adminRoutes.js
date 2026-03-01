const express = require("express");
const {
  adminLogin,
  getDashboardStats,
  changePassword,
} = require("../controllers/adminController");

const { protectAdmin } = require("../middleware/adminAuthMiddleware");

const router = express.Router();

router.post("/login", adminLogin);
router.get("/dashboard-stats", getDashboardStats);
router.put("/change-password", protectAdmin, changePassword);

module.exports = router;
