const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "You are authorized to access this protected route",
    user: req.user,
  });
});

module.exports = router;