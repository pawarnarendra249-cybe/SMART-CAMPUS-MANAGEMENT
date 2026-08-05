const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const { createEntry, getTimetable } = require("../controllers/timetableController");

router.post("/", protect, authorize("faculty", "admin"), createEntry);
router.get("/", protect, getTimetable);

module.exports = router;
