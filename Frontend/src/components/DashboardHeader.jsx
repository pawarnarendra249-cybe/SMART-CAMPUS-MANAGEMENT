function DashboardHeader() {
  return (
    <header className="dashboard-header">

      <div className="header-search">
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      <div className="header-right">

        <button className="notification-btn">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">

          <div className="user-avatar">
            NP
          </div>

          <div className="user-info">
            <strong>Narendra Pawar</strong>
            <span>Student</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;