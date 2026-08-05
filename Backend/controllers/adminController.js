const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");
const Notice = require("../models/Notice");
const Event = require("../models/Event");
const StudyMaterial = require("../models/StudyMaterial");
const TimetableEntry = require("../models/TimetableEntry");
const Placement = require("../models/Placement");
const Complaint = require("../models/Complaint");
const Attendance = require("../models/Attendance");

// ==========================================
// USER MANAGEMENT (Admin only)
// ==========================================

// Get every user with basic profile info, plus student profile summary if it exists
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role createdAt").sort({
      createdAt: -1,
    });

    const profiles = await StudentProfile.find().select(
      "user studentId department branch semester"
    );
    const profileMap = {};
    profiles.forEach((p) => {
      profileMap[p.user.toString()] = p;
    });

    const result = users.map((u) => ({
      ...u.toObject(),
      studentProfile: profileMap[u._id.toString()] || null,
    }));

    res.status(200).json({ message: "Users fetched successfully", users: result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change a user's role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["student", "faculty", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Role must be one of: student, faculty, admin",
      });
    }

    if (req.params.id === req.user.id && role !== "admin") {
      return res.status(400).json({
        message: "You cannot remove your own admin access",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("name email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a user account (and their student profile / attendance records, if any)
const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await StudentProfile.deleteOne({ user: user._id });
    await Attendance.deleteMany({ student: user._id });
    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==========================================
// CONTENT MODERATION (Admin only)
// ==========================================
// Lets an admin remove any campus-content item regardless of who created it.

const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ message: "Material not found" });
    res.status(200).json({ message: "Study material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTimetableEntry = async (req, res) => {
  try {
    const entry = await TimetableEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: "Timetable entry not found" });
    res.status(200).json({ message: "Timetable entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(req.params.id);
    if (!placement) return res.status(404).json({ message: "Placement not found" });
    res.status(200).json({ message: "Placement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==========================================
// DASHBOARD SUMMARY (Admin only)
// ==========================================

const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalFaculty,
      totalNotices,
      totalEvents,
      totalComplaints,
      pendingComplaints,
      totalPlacements,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "faculty" }),
      Notice.countDocuments(),
      Event.countDocuments(),
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: "Pending" }),
      Placement.countDocuments(),
    ]);

    res.status(200).json({
      message: "Stats fetched successfully",
      stats: {
        totalUsers,
        totalStudents,
        totalFaculty,
        totalNotices,
        totalEvents,
        totalComplaints,
        pendingComplaints,
        totalPlacements,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteNotice,
  deleteEvent,
  deleteMaterial,
  deleteTimetableEntry,
  deletePlacement,
  deleteComplaint,
  getAdminStats,
};
