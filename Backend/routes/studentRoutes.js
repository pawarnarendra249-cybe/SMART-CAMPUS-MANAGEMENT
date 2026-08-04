const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createStudentProfile,
  getMyStudentProfile,
  updateMyStudentProfile,
} = require("../controllers/studentController");


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


module.exports = router;