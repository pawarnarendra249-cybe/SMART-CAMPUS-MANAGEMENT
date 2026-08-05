const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteNotice,
  deleteEvent,
  deleteMaterial,
  deleteTimetableEntry,
  deletePlacement,
  deleteComplaint,
  getAdminStats,
} = require("../controllers/adminController");

// Every route in this file is admin-only.
router.use(protect, authorize("admin"));

// ==========================================
// DASHBOARD SUMMARY
// ==========================================
router.get("/stats", getAdminStats);

// ==========================================
// USER MANAGEMENT
// ==========================================
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

// ==========================================
// CONTENT MODERATION
// ==========================================
router.delete("/notices/:id", deleteNotice);
router.delete("/events/:id", deleteEvent);
router.delete("/materials/:id", deleteMaterial);
router.delete("/timetable/:id", deleteTimetableEntry);
router.delete("/placements/:id", deletePlacement);
router.delete("/complaints/:id", deleteComplaint);

module.exports = router;
