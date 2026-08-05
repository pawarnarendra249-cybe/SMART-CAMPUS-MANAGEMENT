const Notice = require("../models/Notice");

// Create a notice (Faculty/Admin)
const createNotice = async (req, res) => {
  try {
    const { title, description, category, important } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const notice = await Notice.create({
      title,
      description,
      category,
      important: important || false,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Notice created successfully", notice });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all notices (any logged-in user)
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Notices fetched successfully", notices });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createNotice, getAllNotices };
