const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  createMaterial,
  getAllMaterials,
} = require("../controllers/studyMaterialController");

router.post("/", protect, authorize("faculty", "admin"), createMaterial);
router.get("/", protect, getAllMaterials);

module.exports = router;
