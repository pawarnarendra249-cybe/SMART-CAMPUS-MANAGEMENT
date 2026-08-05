const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createStudentProfile,
  getMyStudentProfile,
  updateMyStudentProfile,
  deleteMyStudentProfile,
  getAllStudents,
} = require("../controllers/studentController");


// ==========================================
// GET ALL STUDENTS (Faculty / Admin only)
// ==========================================

router.get(
  "/all",
  protect,
  authorize("faculty", "admin"),
  getAllStudents
);


// ==========================================
// CREATE STUDENT PROFILE
// ==========================================

router.post(
  "/profile",
  protect,
  createStudentProfile
);


// ==========================================
// GET MY STUDENT PROFILE
// ==========================================

router.get(
  "/profile",
  protect,
  getMyStudentProfile
);


// ==========================================
// UPDATE MY STUDENT PROFILE
// ==========================================

router.put(
  "/profile",
  protect,
  updateMyStudentProfile
);


// ==========================================
// DELETE MY STUDENT PROFILE
// ==========================================

router.delete(
  "/profile",
  protect,
  deleteMyStudentProfile
);


module.exports = router;