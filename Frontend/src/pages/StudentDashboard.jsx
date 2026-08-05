import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getUser } from "../utils/auth";
import { getMyAttendance } from "../services/attendanceService";
import { getAllNotices } from "../services/noticeService";
import { getAllEvents } from "../services/eventService";
import { getAllPlacements } from "../services/placementService";

function formatEventDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return { day: "--", month: "" };
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
}

function formatNoticeDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function StudentDashboard() {
  const currentUser = getUser();
  const firstName = currentUser?.name ? currentUser.name.split(" ")[0] : "there";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentNotices, setRecentNotices] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    // Each call is independent — if one module isn't set up for this
    // user yet (e.g. no attendance marked), the rest should still load.
    const results = await Promise.allSettled([
      getMyAttendance(),
      getAllEvents(),
      getAllNotices(),
      getAllPlacements(),
    ]);

    const [attendanceRes, eventsRes, noticesRes, placementsRes] = results;

    if (attendanceRes.status === "fulfilled") {
      setAttendancePercentage(attendanceRes.value.overall?.percentage ?? 0);
    }

    if (eventsRes.status === "fulfilled") {
      const now = new Date();
      const upcoming = (eventsRes.value.events || [])
        .filter((e) => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 2);
      setUpcomingEvents(upcoming);
    }

    if (noticesRes.status === "fulfilled") {
      const notices = noticesRes.value.notices || [];
      setNoticeCount(notices.length);
      setRecentNotices(notices.slice(0, 2));
    }

    if (placementsRes.status === "fulfilled") {
      setJobCount((placementsRes.value.placements || []).length);
    }

    // Only surface an error if literally everything failed
    if (results.every((r) => r.status === "rejected")) {
      setError("Could not load dashboard data. Please try again later.");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="welcome-section">
        <div>
          <h1>Good to see you, {firstName} 👋</h1>
          <p>Here's what's happening on your campus today.</p>
        </div>
      </div>

      {error && (
        <p className="auth-error" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div>
            <span>Attendance</span>
            <h2>
              {loading
                ? "..."
                : attendancePercentage === null
                ? "N/A"
                : `${attendancePercentage}%`}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div>
            <span>Upcoming Events</span>
            <h2>{loading ? "..." : upcomingEvents.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📢</div>
          <div>
            <span>New Notices</span>
            <h2>{loading ? "..." : noticeCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div>
            <span>Job Opportunities</span>
            <h2>{loading ? "..." : jobCount}</h2>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-title">
        <h2>Quick Actions</h2>
      </div>

      <div className="quick-actions">
        <Link to="/attendance" className="quick-action-card">
          📊
          <span>Check Attendance</span>
        </Link>

        <Link to="/timetable" className="quick-action-card">
          🗓️
          <span>View Timetable</span>
        </Link>

        <Link to="/study-materials" className="quick-action-card">
          📚
          <span>Study Materials</span>
        </Link>

        <Link to="/complaints" className="quick-action-card">
          📝
          <span>Submit Complaint</span>
        </Link>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Upcoming Events */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <Link to="/events">View All</Link>
          </div>

          {loading && <p>Loading events...</p>}

          {!loading && upcomingEvents.length === 0 && (
            <p>No upcoming events right now.</p>
          )}

          {upcomingEvents.map((event) => {
            const { day, month } = formatEventDate(event.date);
            return (
              <div className="event-item" key={event._id}>
                <div className="event-date">
                  <strong>{day}</strong>
                  <span>{month}</span>
                </div>
                <div>
                  <h3>{event.title}</h3>
                  <p>📍 {event.location}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Notices */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Notices</h2>
            <Link to="/notices">View All</Link>
          </div>

          {loading && <p>Loading notices...</p>}

          {!loading && recentNotices.length === 0 && (
            <p>No notices published yet.</p>
          )}

          {recentNotices.map((notice) => (
            <div className="notice-item" key={notice._id}>
              <div className="notice-icon">📢</div>
              <div>
                <h3>{notice.title}</h3>
                <p>{formatNoticeDate(notice.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
