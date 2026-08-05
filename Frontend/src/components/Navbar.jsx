import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, clearAuth, getUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getUser();
  const isStaff = user?.role === "faculty" || user?.role === "admin";
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Smart Campus</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/notices">Notices</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-buttons">
        {loggedIn ? (
          <>
            <Link
              to={isAdmin ? "/admin-panel" : isStaff ? "/faculty-dashboard" : "/student-dashboard"}
              className="login-btn"
            >
              Dashboard
            </Link>
            <button className="register-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
