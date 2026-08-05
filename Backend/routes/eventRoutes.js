const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  createEvent,
  getAllEvents,
  toggleRegistration,
} = require("../controllers/eventController");

router.post("/", protect, authorize("faculty", "admin"), createEvent);
router.get("/", protect, getAllEvents);
router.post("/:id/register", protect, toggleRegistration);

module.exports = router;
