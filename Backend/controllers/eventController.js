const Event = require("../models/Event");

// Create an event (Faculty/Admin)
const createEvent = async (req, res) => {
  try {
    const { title, category, location, date, description } = req.body;

    if (!title || !category || !location || !date || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const event = await Event.create({
      title,
      category,
      location,
      date,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all events, flagged with whether current user is registered
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    const result = events.map((event) => ({
      ...event.toObject(),
      registered: event.registeredStudents.some(
        (id) => id.toString() === req.user.id
      ),
      registeredCount: event.registeredStudents.length,
    }));

    res.status(200).json({ message: "Events fetched successfully", events: result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle registration for the logged-in student
const toggleRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRegistered = event.registeredStudents.some(
      (id) => id.toString() === req.user.id
    );

    if (alreadyRegistered) {
      event.registeredStudents = event.registeredStudents.filter(
        (id) => id.toString() !== req.user.id
      );
    } else {
      event.registeredStudents.push(req.user.id);
    }

    await event.save();

    res.status(200).json({
      message: alreadyRegistered ? "Registration cancelled" : "Registered successfully",
      registered: !alreadyRegistered,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createEvent, getAllEvents, toggleRegistration };
