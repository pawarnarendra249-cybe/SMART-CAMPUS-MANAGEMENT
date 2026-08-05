const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  submitComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

router.post("/", protect, submitComplaint);
router.get("/my", protect, getMyComplaints);
router.get("/", protect, authorize("faculty", "admin"), getAllComplaints);
router.put("/:id/status", protect, authorize("faculty", "admin"), updateComplaintStatus);

module.exports = router;
