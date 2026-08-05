import { useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../utils/auth";

function DashboardHeader() {
  const navigate = useNavigate();
  const user = getUser();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="dashboard-header">
      <div className="header-search">
        <span>🔍</span>

        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="header-right">
        <button className="notification-btn">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">{initials}</div>

          <div className="user-info">
            <strong>{user?.name || "Guest"}</strong>
            <span style={{ textTransform: "capitalize" }}>
              {user?.role || ""}
            </span>
          </div>
        </div>

        <button className="notification-btn" onClick={handleLogout} title="Logout">
          🚪
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
