const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  markAttendance,
  getMyAttendance,
  getStudentAttendance,
} = require("../controllers/attendanceController");

// ==========================================
// MARK ATTENDANCE (Faculty / Admin only)
// ==========================================
router.post("/mark", protect, authorize("faculty", "admin"), markAttendance);

// ==========================================
// GET MY ATTENDANCE (Student)
// ==========================================
router.get("/my", protect, getMyAttendance);

// ==========================================
// GET A SPECIFIC STUDENT'S ATTENDANCE (Faculty / Admin only)
// ==========================================
router.get(
  "/student/:studentId",
  protect,
  authorize("faculty", "admin"),
  getStudentAttendance
);

module.exports = router;
