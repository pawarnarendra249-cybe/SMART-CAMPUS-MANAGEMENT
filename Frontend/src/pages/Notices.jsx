import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { getAllNotices } from "../services/noticeService";

function Notices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadNotices() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllNotices();
      setNotices(data.notices);
    } catch (err) {
      setError(err.message || "Could not load notices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || notice.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="page-container">
        {/* Page Header */}

        <div className="page-header">
          <div>
            <h1>Campus Notices</h1>
            <p>Stay updated with the latest college announcements.</p>
          </div>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Search and Filter */}

        <div className="notice-controls">
          <div className="notice-search">
            🔍
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Examination">Examination</option>
            <option value="General">General</option>
            <option value="Placement">Placement</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        {/* Important Notices */}

        <div className="important-notice">
          <div className="important-icon">📌</div>

          <div>
            <h3>Important Announcement</h3>
            <p>
              Please regularly check the notices section for important
              academic and campus updates.
            </p>
          </div>
        </div>

        {/* Notice List */}

        {loading ? (
          <p>Loading notices...</p>
        ) : (
          <div className="notices-list">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div className="notice-card" key={notice._id}>
                  <div className="notice-card-top">
                    <div className="notice-card-icon">📢</div>

                    <div className="notice-card-content">
                      <div className="notice-meta">
                        <span className="notice-category">{notice.category}</span>

                        {notice.important && (
                          <span className="important-badge">Important</span>
                        )}
                      </div>

                      <h2>{notice.title}</h2>
                      <p>{notice.description}</p>

                      <span className="notice-date">
                        📅 {formatDate(notice.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notices">
                <h2>No Notices Found</h2>
                <p>Try changing your search or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Notices;
