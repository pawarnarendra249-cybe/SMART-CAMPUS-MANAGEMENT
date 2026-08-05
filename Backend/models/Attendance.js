const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    // The student this attendance record belongs to
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subjectCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },

    // Faculty/Admin who marked this record
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate attendance for the same student/subject/date.
// markAttendance uses an upsert, so re-marking the same day updates
// the existing record instead of creating a new one.
attendanceSchema.index(
  { student: 1, subjectCode: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
