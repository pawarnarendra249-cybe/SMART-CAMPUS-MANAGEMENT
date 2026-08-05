const mongoose = require("mongoose");

const timetableEntrySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    time: { type: String, required: true }, // e.g. "09:00 - 10:00"
    subject: { type: String, required: true },
    code: { type: String, default: "" },
    facultyName: { type: String, default: "" },
    room: { type: String, default: "" },
    type: {
      type: String,
      enum: ["Lecture", "Practical", "Break"],
      default: "Lecture",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimetableEntry", timetableEntrySchema);
