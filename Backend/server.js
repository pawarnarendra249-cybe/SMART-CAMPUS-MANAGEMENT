const studentRoutes = require("./routes/studentRoutes");
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

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Campus Management System Backend is Running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});