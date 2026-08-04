const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    // Link Student Profile with User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Student Information
    studentId: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    department: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    division: {
      type: String,
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);