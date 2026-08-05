import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getUser } from "../utils/auth";
import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteNotice,
  deleteEvent,
  deleteMaterial,
  deleteTimetableEntry,
  deletePlacement,
  deleteComplaint,
} from "../services/adminService";
import { getAllNotices } from "../services/noticeService";
import { getAllEvents } from "../services/eventService";
import { getAllMaterials } from "../services/studyMaterialService";
import { getTimetable } from "../services/timetableService";
import { getAllPlacements } from "../services/placementService";
import { getAllComplaints } from "../services/complaintService";

function Message({ text, type }) {
  if (!text) return null;
  return (
    <p style={{ color: type === "error" ? "#dc2626" : "#16a34a", marginTop: "0.5rem" }}>
      {text}
    </p>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="auth-btn"
      style={{
        width: "auto",
        padding: "0.5rem 1rem",
        background: active ? "#4f46e5" : "#e5e7eb",
        color: active ? "#fff" : "#111827",
      }}
    >
      {children}
    </button>
  );
}

// ==========================================
// ADMIN PANEL
// ==========================================
// User management + cross-module content moderation. Admin-only
// (route is gated by RoleRoute, but every underlying API call is
// also protected server-side).

function AdminPanel() {
  const currentUser = getUser();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "📊 Overview" },
    { key: "users", label: "👥 Users" },
    { key: "content", label: "🗂️ Content Moderation" },
  ];

  return (
    <DashboardLayout>
      <div className="welcome-section">
        <div>
          <h1>Admin Panel, {currentUser?.name?.split(" ")[0] || ""} 👋</h1>
          <p>Manage users and moderate campus content.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0 1.5rem" }}>
        {tabs.map((tab) => (
          <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </TabButton>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "users" && <UsersTab currentUserId={currentUser?.id} />}
      {activeTab === "content" && <ContentModerationTab />}
    </DashboardLayout>
  );
}

// ==========================================
// OVERVIEW TAB
// ==========================================

function OverviewTab() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminStats()
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.message || "Could not load stats"));
  }, []);

  if (error) return <Message text={error} type="error" />;
  if (!stats) return <p>Loading stats...</p>;

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: "👥" },
    { label: "Students", value: stats.totalStudents, icon: "🎓" },
    { label: "Faculty", value: stats.totalFaculty, icon: "🧑‍🏫" },
    { label: "Notices", value: stats.totalNotices, icon: "📢" },
    { label: "Events", value: stats.totalEvents, icon: "📅" },
    { label: "Placements", value: stats.totalPlacements, icon: "💼" },
    { label: "Total Complaints", value: stats.totalComplaints, icon: "📝" },
    { label: "Pending Complaints", value: stats.pendingComplaints, icon: "⏳" },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div className="stat-card" key={c.label}>
          <div className="stat-icon">{c.icon}</div>
          <div>
            <span>{c.label}</span>
            <h2>{c.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// USERS TAB
// ==========================================

function UsersTab({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  function load() {
    getAllUsers()
      .then((data) => setUsers(data.users || []))
      .catch((err) => setError(err.message || "Could not load users"));
  }

  useEffect(() => {
    load();
  }, []);

  const handleRoleChange = async (id, role) => {
    setBusyId(id);
    setError("");
    try {
      await updateUserRole(id, role);
      load();
    } catch (err) {
      setError(err.message || "Could not update role");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete user "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setBusyId(id);
    setError("");
    try {
      await deleteUser(id);
      load();
    } catch (err) {
      setError(err.message || "Could not delete user");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="complaint-history">
      <h2>All Users ({users.length})</h2>
      <Message text={error} type="error" />

      {users.map((u) => (
        <div className="complaint-card" key={u._id}>
          <h3>{u.name} {u._id === currentUserId && "(you)"}</h3>
          <p>{u.email}</p>
          {u.studentProfile && (
            <p>
              Student ID: {u.studentProfile.studentId} — {u.studentProfile.department},
              Sem {u.studentProfile.semester}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "0.5rem" }}>
            <div className="form-group" style={{ maxWidth: "180px", margin: 0 }}>
              <select
                value={u.role}
                disabled={busyId === u._id || u._id === currentUserId}
                onChange={(e) => handleRoleChange(u._id, e.target.value)}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {u._id !== currentUserId && (
              <button
                className="auth-btn"
                style={{ width: "auto", background: "#dc2626" }}
                disabled={busyId === u._id}
                onClick={() => handleDelete(u._id, u.name)}
              >
                {busyId === u._id ? "Working..." : "🗑️ Delete"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// CONTENT MODERATION TAB
// ==========================================

function ContentModerationTab() {
  const [category, setCategory] = useState("notices");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const categories = {
    notices: { label: "Notices", getAll: getAllNotices, key: "notices", del: deleteNotice },
    events: { label: "Events", getAll: getAllEvents, key: "events", del: deleteEvent },
    materials: { label: "Study Materials", getAll: getAllMaterials, key: "materials", del: deleteMaterial },
    timetable: { label: "Timetable", getAll: getTimetable, key: "timetable", del: deleteTimetableEntry },
    placements: { label: "Placements", getAll: getAllPlacements, key: "placements", del: deletePlacement },
    complaints: { label: "Complaints", getAll: getAllComplaints, key: "complaints", del: deleteComplaint },
  };

  function load() {
    setError("");
    const conf = categories[category];
    conf
      .getAll()
      .then((data) => {
        // Timetable returns a { Monday: [...], Tuesday: [...] } shape — flatten it.
        if (category === "timetable") {
          const flat = Object.values(data.timetable || {}).flat();
          setItems(flat);
        } else {
          setItems(data[conf.key] || []);
        }
      })
      .catch((err) => setError(err.message || "Could not load items"));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this item? This cannot be undone.");
    if (!confirmed) return;

    setBusyId(id);
    try {
      await categories[category].del(id);
      load();
    } catch (err) {
      setError(err.message || "Could not delete item");
    } finally {
      setBusyId(null);
    }
  };

  const renderLabel = (item) => {
    switch (category) {
      case "notices":
        return `${item.title} — ${item.category}`;
      case "events":
        return `${item.title} — 📍 ${item.location} — ${new Date(item.date).toLocaleDateString()}`;
      case "materials":
        return `${item.title} — ${item.subject} (${item.type})`;
      case "timetable":
        return `${item.day} ${item.time} — ${item.subject}`;
      case "placements":
        return `${item.company} — ${item.role}`;
      case "complaints":
        return `${item.subject} — ${item.status}`;
      default:
        return item.title || item.name || item._id;
    }
  };

  return (
    <div className="complaint-history">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {Object.entries(categories).map(([key, conf]) => (
          <TabButton key={key} active={category === key} onClick={() => setCategory(key)}>
            {conf.label}
          </TabButton>
        ))}
      </div>

      <h2>{categories[category].label} ({items.length})</h2>
      <Message text={error} type="error" />

      {items.map((item) => (
        <div className="complaint-card" key={item._id}>
          <h3>{renderLabel(item)}</h3>
          <button
            className="auth-btn"
            style={{ width: "auto", background: "#dc2626", marginTop: "0.5rem" }}
            disabled={busyId === item._id}
            onClick={() => handleDelete(item._id)}
          >
            {busyId === item._id ? "Deleting..." : "🗑️ Delete"}
          </button>
        </div>
      ))}

      {items.length === 0 && !error && <p>Nothing here yet.</p>}
    </div>
  );
}

export default AdminPanel;
