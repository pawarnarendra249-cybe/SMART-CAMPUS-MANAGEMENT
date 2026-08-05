const TimetableEntry = require("../models/TimetableEntry");

// Add a timetable entry (Faculty/Admin)
const createEntry = async (req, res) => {
  try {
    const { day, time, subject, code, facultyName, room, type } = req.body;

    if (!day || !time || !subject) {
      return res.status(400).json({ message: "day, time and subject are required" });
    }

    const entry = await TimetableEntry.create({
      day,
      time,
      subject,
      code,
      facultyName,
      room,
      type,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Timetable entry created successfully", entry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get full timetable (any logged-in user), grouped by day
const getTimetable = async (req, res) => {
  try {
    const entries = await TimetableEntry.find().sort({ time: 1 });

    const grouped = {};
    entries.forEach((entry) => {
      if (!grouped[entry.day]) grouped[entry.day] = [];
      grouped[entry.day].push(entry);
    });

    res.status(200).json({ message: "Timetable fetched successfully", timetable: grouped });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createEntry, getTimetable };
