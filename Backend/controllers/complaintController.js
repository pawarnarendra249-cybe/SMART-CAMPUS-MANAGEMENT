const Complaint = require("../models/Complaint");

// Submit a complaint (Student)
const submitComplaint = async (req, res) => {
  try {
    const { category, subject, location, description } = req.body;

    if (!category || !subject || !location || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const complaint = await Complaint.create({
      category,
      subject,
      location,
      description,
      submittedBy: req.user.id,
    });

    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get logged-in user's own complaints
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ submittedBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ message: "Complaints fetched successfully", complaints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all complaints (Faculty/Admin)
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "All complaints fetched successfully", complaints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update complaint status (Faculty/Admin)
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint status updated", complaint });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  submitComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
};
