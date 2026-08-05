const Placement = require("../models/Placement");

// Post a new job/internship (Admin/Placement Officer)
const createPlacement = async (req, res) => {
  try {
    const { company, role, type, location, salary, eligibility, deadline } = req.body;

    if (!company || !role || !type || !location || !salary || !eligibility || !deadline) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const placement = await Placement.create({
      company,
      role,
      type,
      location,
      salary,
      eligibility,
      deadline,
      postedBy: req.user.id,
    });

    res.status(201).json({ message: "Placement posted successfully", placement });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all placements, flagged with whether current user has applied
const getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ deadline: 1 });

    const result = placements.map((job) => ({
      ...job.toObject(),
      applied: job.appliedStudents.some((id) => id.toString() === req.user.id),
      applicantCount: job.appliedStudents.length,
    }));

    res.status(200).json({ message: "Placements fetched successfully", placements: result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle apply for the logged-in student
const toggleApplication = async (req, res) => {
  try {
    const job = await Placement.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Placement not found" });
    }

    const alreadyApplied = job.appliedStudents.some(
      (id) => id.toString() === req.user.id
    );

    if (alreadyApplied) {
      job.appliedStudents = job.appliedStudents.filter(
        (id) => id.toString() !== req.user.id
      );
    } else {
      job.appliedStudents.push(req.user.id);
    }

    await job.save();

    res.status(200).json({
      message: alreadyApplied ? "Application withdrawn" : "Applied successfully",
      applied: !alreadyApplied,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createPlacement, getAllPlacements, toggleApplication };
