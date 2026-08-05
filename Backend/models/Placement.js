const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full Time", "Internship"],
      required: true,
    },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    eligibility: { type: String, required: true },
    deadline: { type: Date, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appliedStudents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
