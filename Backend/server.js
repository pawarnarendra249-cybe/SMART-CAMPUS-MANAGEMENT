const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const placementRoutes = require("./routes/placementRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/protected", protectedRoutes);

// Student Routes
app.use("/api/students", studentRoutes);

// Attendance Routes
app.use("/api/attendance", attendanceRoutes);

// Notice Routes
app.use("/api/notices", noticeRoutes);

// Event Routes
app.use("/api/events", eventRoutes);

// Study Material Routes
app.use("/api/materials", studyMaterialRoutes);

// Timetable Routes
app.use("/api/timetable", timetableRoutes);

// Complaint Routes
app.use("/api/complaints", complaintRoutes);

// Placement Routes
app.use("/api/placements", placementRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Campus Management System Backend is Running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});