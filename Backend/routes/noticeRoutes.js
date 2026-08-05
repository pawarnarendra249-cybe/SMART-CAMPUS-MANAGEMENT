const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const { createNotice, getAllNotices } = require("../controllers/noticeController");

router.post("/", protect, authorize("faculty", "admin"), createNotice);
router.get("/", protect, getAllNotices);

module.exports = router;
