import { NavLink, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../utils/auth";

function Sidebar() {
  const navigate = useNavigate();
  const user = getUser();
  const isStaff = user?.role === "faculty" || user?.role === "admin";
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">🎓</div>
        <h2>SmartCampus</h2>
      </div>

      <nav className="sidebar-nav">

        <NavLink
          to={isAdmin ? "/admin-panel" : isStaff ? "/faculty-dashboard" : "/student-dashboard"}
          className="sidebar-link"
        >
          <span>🏠</span>
          Dashboard
        </NavLink>

        {isStaff && (
          <NavLink
            to="/faculty-dashboard"
            className="sidebar-link"
          >
            <span>🧑‍🏫</span>
            Faculty Panel
          </NavLink>
        )}

        {isAdmin && (
          <NavLink
            to="/admin-panel"
            className="sidebar-link"
          >
            <span>🛠️</span>
            Admin Panel
          </NavLink>
        )}

        <NavLink
          to="/notices"
          className="sidebar-link"
        >
          <span>📢</span>
          Notices
        </NavLink>

        <NavLink
          to="/events"
          className="sidebar-link"
        >
          <span>📅</span>
          Events
        </NavLink>

        <NavLink
          to="/study-materials"
          className="sidebar-link"
        >
          <span>📚</span>
          Study Materials
        </NavLink>

        <NavLink
          to="/attendance"
          className="sidebar-link"
        >
          <span>📊</span>
          Attendance
        </NavLink>

        <NavLink
          to="/timetable"
          className="sidebar-link"
        >
          <span>🗓️</span>
          Timetable
        </NavLink>

        <NavLink
          to="/placements"
          className="sidebar-link"
        >
          <span>💼</span>
          Placements
        </NavLink>

        <NavLink
          to="/complaints"
          className="sidebar-link"
        >
          <span>📝</span>
          Complaints
        </NavLink>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          <span>👤</span>
          Profile
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <button className="sidebar-settings">
          ⚙️ Settings
        </button>

        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;