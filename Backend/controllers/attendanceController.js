const Attendance = require("../models/Attendance");

// ==========================================
// MARK ATTENDANCE (Faculty / Admin only)
// ==========================================
// Marks (or updates, if already marked for that day) one student's
// attendance for a subject on a given date.

const markAttendance = async (req, res) => {
  try {
    const { studentId, subjectCode, subjectName, date, status } = req.body;

    if (!studentId || !subjectCode || !subjectName || !date || !status) {
      return res.status(400).json({
        message:
          "Please provide studentId, subjectCode, subjectName, date and status",
      });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either 'Present' or 'Absent'",
      });
    }

    // Upsert: if this student already has a record for this subject+date,
    // update it instead of creating a duplicate.
    const record = await Attendance.findOneAndUpdate(
      {
        student: studentId,
        subjectCode: subjectCode.toUpperCase(),
        date: new Date(date),
      },
      {
        student: studentId,
        subjectCode: subjectCode.toUpperCase(),
        subjectName,
        date: new Date(date),
        status,
        markedBy: req.user.id,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      message: "Attendance marked successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY ATTENDANCE (Student)
// ==========================================
// Returns every attendance record for the logged-in student,
// plus a subject-wise and overall percentage summary.

const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user.id }).sort({
      date: -1,
    });

    // Group by subject to compute per-subject stats
    const subjectMap = {};

    records.forEach((rec) => {
      if (!subjectMap[rec.subjectCode]) {
        subjectMap[rec.subjectCode] = {
          subjectCode: rec.subjectCode,
          subjectName: rec.subjectName,
          totalClasses: 0,
          present: 0,
        };
      }

      subjectMap[rec.subjectCode].totalClasses += 1;
      if (rec.status === "Present") {
        subjectMap[rec.subjectCode].present += 1;
      }
    });

    const subjects = Object.values(subjectMap).map((s) => ({
      ...s,
      percentage:
        s.totalClasses > 0
          ? Math.round((s.present / s.totalClasses) * 100)
          : 0,
    }));

    const totalClasses = records.length;
    const totalPresent = records.filter((r) => r.status === "Present").length;
    const overallPercentage =
      totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

    res.status(200).json({
      message: "Attendance fetched successfully",
      overall: {
        totalClasses,
        totalPresent,
        totalAbsent: totalClasses - totalPresent,
        percentage: overallPercentage,
      },
      subjects,
      records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// GET ATTENDANCE FOR A SPECIFIC STUDENT (Faculty / Admin)
// ==========================================

const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ student: studentId }).sort({
      date: -1,
    });

    res.status(200).json({
      message: "Student attendance fetched successfully",
      records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getStudentAttendance,
};
