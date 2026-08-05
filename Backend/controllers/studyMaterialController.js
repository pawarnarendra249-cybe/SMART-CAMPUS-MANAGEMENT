const StudyMaterial = require("../models/StudyMaterial");

// Upload a study material (Faculty/Admin)
const createMaterial = async (req, res) => {
  try {
    const { title, subject, type, facultyName, description, resourceUrl } = req.body;

    if (!title || !subject || !type || !facultyName || !description || !resourceUrl) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const material = await StudyMaterial.create({
      title,
      subject,
      type,
      facultyName,
      description,
      resourceUrl,
      uploadedBy: req.user.id,
    });

    res.status(201).json({ message: "Study material uploaded successfully", material });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all study materials (any logged-in user)
const getAllMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Materials fetched successfully", materials });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createMaterial, getAllMaterials };
