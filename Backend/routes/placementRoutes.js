const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  createPlacement,
  getAllPlacements,
  toggleApplication,
} = require("../controllers/placementController");

router.post("/", protect, authorize("admin"), createPlacement);
router.get("/", protect, getAllPlacements);
router.post("/:id/apply", protect, toggleApplication);

module.exports = router;
