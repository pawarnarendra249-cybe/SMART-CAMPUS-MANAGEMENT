import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function StudentDashboard() {
  return (
    <DashboardLayout>

      <div className="welcome-section">

        <div>
          <h1>Good Morning, Narendra 👋</h1>

          <p>
            Here's what's happening on your campus today.
          </p>
        </div>

      </div>


      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📊</div>

          <div>
            <span>Attendance</span>
            <h2>88%</h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">📅</div>

          <div>
            <span>Upcoming Events</span>
            <h2>3</h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">📢</div>

          <div>
            <span>New Notices</span>
            <h2>5</h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">💼</div>

          <div>
            <span>Job Opportunities</span>
            <h2>8</h2>
          </div>
        </div>

      </div>


      {/* Quick Actions */}

      <div className="section-title">
        <h2>Quick Actions</h2>
      </div>


      <div className="quick-actions">

        <Link
          to="/attendance"
          className="quick-action-card"
        >
          📊
          <span>Check Attendance</span>
        </Link>


        <Link
          to="/timetable"
          className="quick-action-card"
        >
          🗓️
          <span>View Timetable</span>
        </Link>


        <Link
          to="/study-materials"
          className="quick-action-card"
        >
          📚
          <span>Study Materials</span>
        </Link>


        <Link
          to="/complaints"
          className="quick-action-card"
        >
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

            <Link to="/events">
              View All
            </Link>
          </div>


          <div className="event-item">

            <div className="event-date">
              <strong>15</strong>
              <span>AUG</span>
            </div>

            <div>
              <h3>Tech Fest 2026</h3>
              <p>📍 Main Auditorium</p>
            </div>

          </div>


          <div className="event-item">

            <div className="event-date">
              <strong>20</strong>
              <span>AUG</span>
            </div>

            <div>
              <h3>Coding Competition</h3>
              <p>📍 Computer Lab</p>
            </div>

          </div>

        </div>


        {/* Recent Notices */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>Recent Notices</h2>

            <Link to="/notices">
              View All
            </Link>

          </div>


          <div className="notice-item">

            <div className="notice-icon">
              📢
            </div>

            <div>
              <h3>Semester Examination Notice</h3>
              <p>01 August 2026</p>
            </div>

          </div>


          <div className="notice-item">

            <div className="notice-icon">
              📢
            </div>

            <div>
              <h3>Assignment Submission</h3>
              <p>10 August 2026</p>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;