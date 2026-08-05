const StudentProfile = require("../models/StudentProfile");
const User = require("../models/User");

// ==========================================
// CREATE STUDENT PROFILE
// ==========================================

const createStudentProfile = async (req, res) => {
  try {
    const {
      studentId,
      phone,
      department,
      branch,
      semester,
      division,
      address,
    } = req.body;

    // Check required fields
    if (!studentId || !department || !branch || !semester) {
      return res.status(400).json({
        message:
          "Please fill studentId, department, branch and semester",
      });
    }

    // Check if profile already exists for this user
    const existingProfile = await StudentProfile.findOne({
      user: req.user.id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Student profile already exists",
      });
    }

    // Check if student ID already exists
    const existingStudentId = await StudentProfile.findOne({
      studentId,
    });

    if (existingStudentId) {
      return res.status(400).json({
        message: "Student ID already exists",
      });
    }

    // Create Student Profile
    const studentProfile = await StudentProfile.create({
      user: req.user.id,
      studentId,
      phone,
      department,
      branch,
      semester,
      division,
      address,
    });

    res.status(201).json({
      message: "Student profile created successfully",
      profile: studentProfile,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// GET MY STUDENT PROFILE
// ==========================================

const getMyStudentProfile = async (req, res) => {
  try {
    // Find profile of logged-in user
    const profile = await StudentProfile.findOne({
      user: req.user.id,
    }).populate("user", "name email role");

    // If profile not found
    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // Send profile
    res.status(200).json({
      message: "Student profile fetched successfully",
      profile: profile,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE MY STUDENT PROFILE
// ==========================================

const updateMyStudentProfile = async (req, res) => {
  try {
    const {
      phone,
      department,
      branch,
      semester,
      division,
      address,
    } = req.body;

    // Find logged-in student's profile
    const profile = await StudentProfile.findOne({
      user: req.user.id,
    });

    // If profile not found
    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // Update fields only if provided
    if (phone !== undefined) {
      profile.phone = phone;
    }

    if (department !== undefined) {
      profile.department = department;
    }

    if (branch !== undefined) {
      profile.branch = branch;
    }

    if (semester !== undefined) {
      profile.semester = semester;
    }

    if (division !== undefined) {
      profile.division = division;
    }

    if (address !== undefined) {
      profile.address = address;
    }

    // Save updated profile
    await profile.save();

    res.status(200).json({
      message: "Student profile updated successfully",
      profile: profile,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE MY STUDENT PROFILE
// ==========================================

const deleteMyStudentProfile = async (req, res) => {
  try {
    // Find logged-in student's profile
    const profile = await StudentProfile.findOne({
      user: req.user.id,
    });

    // If profile not found
    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    await StudentProfile.deleteOne({ _id: profile._id });

    res.status(200).json({
      message: "Student profile deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL STUDENTS (Faculty / Admin only)
// ==========================================
// Lightweight list used by faculty/admin UIs (e.g. the attendance-marking
// dropdown) to pick which student they're acting on.

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email")
      .sort({ name: 1 });

    res.status(200).json({
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {
  createStudentProfile,
  getMyStudentProfile,
  updateMyStudentProfile,
  deleteMyStudentProfile,
  getAllStudents,
};