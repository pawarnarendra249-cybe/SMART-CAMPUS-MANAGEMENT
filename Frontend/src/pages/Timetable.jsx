import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getTimetable } from "../services/timetableService";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTimetable() {
    setLoading(true);
    setError("");
    try {
      const data = await getTimetable();
      setTimetable(data.timetable);
    } catch (err) {
      setError(err.message || "Could not load timetable");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTimetable();
  }, []);

  const selectedSchedule = timetable[selectedDay] || [];

  return (
    <DashboardLayout>
      <div className="page-container">
        {/* Page Header */}

        <div className="page-header">
          <h1>Class Timetable</h1>
          <p>View your weekly class schedule and plan your day.</p>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Day Selector */}

        <div className="day-selector">
          {days.map((day) => (
            <button
              key={day}
              className={selectedDay === day ? "day-btn active" : "day-btn"}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Selected Day */}

        <div className="selected-day-header">
          <div>
            <h2>{selectedDay}</h2>
            <p>{selectedSchedule.length} classes scheduled</p>
          </div>

          <span className="today-badge">Weekly Schedule</span>
        </div>

        {/* Timetable */}

        {loading ? (
          <p>Loading timetable...</p>
        ) : (
          <div className="timetable">
            {selectedSchedule.length > 0 ? (
              selectedSchedule.map((item) => (
                <div
                  className={
                    item.type === "Break" ? "timetable-row break-row" : "timetable-row"
                  }
                  key={item._id}
                >
                  <div className="timetable-time">
                    <strong>{item.time}</strong>
                  </div>

                  {item.type === "Break" ? (
                    <div className="break-content">☕ Break Time</div>
                  ) : (
                    <div className="class-content">
                      <div className="class-main">
                        <div className="class-icon">
                          {item.type === "Practical" ? "💻" : "📚"}
                        </div>

                        <div>
                          <span className="class-type">{item.type}</span>
                          <h3>{item.subject}</h3>
                          <span className="class-code">{item.code}</span>
                        </div>
                      </div>

                      <div className="class-details">
                        <span>👨‍🏫 {item.facultyName}</span>
                        <span>🚪 {item.room}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ padding: "1rem" }}>No classes scheduled for {selectedDay} yet.</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Timetable;
