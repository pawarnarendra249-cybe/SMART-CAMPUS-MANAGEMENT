const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    type: {
      type: String,
      enum: ["PDF", "Video", "Link"],
      required: true,
    },
    facultyName: { type: String, required: true },
    description: { type: String, required: true },
    resourceUrl: { type: String, required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
