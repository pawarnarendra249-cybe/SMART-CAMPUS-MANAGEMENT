import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getUser } from "../utils/auth";
import { getAllStudents } from "../services/studentService";
import { markAttendance } from "../services/attendanceService";
import { createNotice, getAllNotices } from "../services/noticeService";
import { createEvent, getAllEvents } from "../services/eventService";
import { createMaterial, getAllMaterials } from "../services/studyMaterialService";
import { createTimetableEntry } from "../services/timetableService";
import { getAllComplaints, updateComplaintStatus } from "../services/complaintService";
import { createPlacement, getAllPlacements } from "../services/placementService";

// ==========================================
// SMALL SHARED PIECES
// ==========================================

function Message({ text, type }) {
  if (!text) return null;
  return (
    <p
      style={{
        color: type === "error" ? "#dc2626" : "#16a34a",
        marginTop: "0.5rem",
      }}
    >
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
// FACULTY / ADMIN DASHBOARD
// ==========================================
// One place for faculty/admin write-actions that the backend already
// supports (mark attendance, post notices/events/materials/timetable,
// review complaints, post placements — admin only).

function FacultyDashboard() {
  const currentUser = getUser();
  const role = currentUser?.role;
  const isAdmin = role === "admin";

  const tabs = [
    { key: "attendance", label: "📊 Attendance" },
    { key: "notices", label: "📢 Notices" },
    { key: "events", label: "📅 Events" },
    { key: "materials", label: "📚 Study Materials" },
    { key: "timetable", label: "🗓️ Timetable" },
    { key: "complaints", label: "📝 Complaints" },
    ...(isAdmin ? [{ key: "placements", label: "💼 Placements" }] : []),
  ];

  const [activeTab, setActiveTab] = useState("attendance");

  return (
    <DashboardLayout>
      <div className="welcome-section">
        <div>
          <h1>Faculty Panel, {currentUser?.name?.split(" ")[0] || ""} 👋</h1>
          <p>Manage attendance, campus content and complaints from here.</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {activeTab === "attendance" && <AttendanceTab />}
      {activeTab === "notices" && <NoticesTab />}
      {activeTab === "events" && <EventsTab />}
      {activeTab === "materials" && <MaterialsTab />}
      {activeTab === "timetable" && <TimetableTab />}
      {activeTab === "complaints" && <ComplaintsTab />}
      {activeTab === "placements" && isAdmin && <PlacementsTab />}
    </DashboardLayout>
  );
}

// ==========================================
// ATTENDANCE TAB
// ==========================================

function AttendanceTab() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    subjectCode: "",
    subjectName: "",
    date: "",
    status: "Present",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    getAllStudents()
      .then((data) => setStudents(data.students || []))
      .catch((err) =>
        setMsg({ type: "error", text: err.message || "Could not load students" })
      );
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await markAttendance(form);
      setMsg({ type: "success", text: "Attendance marked successfully." });
      setForm({ ...form, subjectCode: "", subjectName: "" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not mark attendance" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="complaint-form-card">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student</label>
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Subject Code</label>
          <input
            type="text"
            name="subjectCode"
            value={form.subjectCode}
            onChange={handleChange}
            placeholder="e.g. CS301"
            required
          />
        </div>

        <div className="form-group">
          <label>Subject Name</label>
          <input
            type="text"
            name="subjectName"
            value={form.subjectName}
            onChange={handleChange}
            placeholder="e.g. Data Structures"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Mark Attendance"}
        </button>
      </form>
      <Message text={msg?.text} type={msg?.type} />
    </div>
  );
}

// ==========================================
// NOTICES TAB
// ==========================================

function NoticesTab() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    important: false,
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => {
    getAllNotices()
      .then((data) => setNotices(data.notices || []))
      .catch(() => {});
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createNotice(form);
      setMsg({ type: "success", text: "Notice posted successfully." });
      setForm({ title: "", description: "", category: "General", important: false });
      load();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not post notice" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="complaint-form-card">
        <h2>Post a Notice</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Academic</option>
              <option>Examination</option>
              <option>General</option>
              <option>Placement</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="important"
                checked={form.important}
                onChange={handleChange}
                style={{ width: "auto", marginRight: "0.5rem" }}
              />
              Mark as important
            </label>
          </div>
          <button type="submit" disabled={saving}>
            {saving ? "Posting..." : "Post Notice"}
          </button>
        </form>
        <Message text={msg?.text} type={msg?.type} />
      </div>

      <div className="complaint-history">
        <h2>All Notices ({notices.length})</h2>
        {notices.map((n) => (
          <div className="complaint-card" key={n._id}>
            <h3>{n.title} {n.important && "⭐"}</h3>
            <p>{n.category} — {new Date(n.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ==========================================
// EVENTS TAB
// ==========================================

function EventsTab() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => {
    getAllEvents()
      .then((data) => setEvents(data.events || []))
      .catch(() => {});
  };

  useEffect(load, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createEvent(form);
      setMsg({ type: "success", text: "Event created successfully." });
      setForm({ title: "", category: "", location: "", date: "", description: "" });
      load();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not create event" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="complaint-form-card">
        <h2>Create an Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Technical"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={saving}>
            {saving ? "Creating..." : "Create Event"}
          </button>
        </form>
        <Message text={msg?.text} type={msg?.type} />
      </div>

      <div className="complaint-history">
        <h2>All Events ({events.length})</h2>
        {events.map((ev) => (
          <div className="complaint-card" key={ev._id}>
            <h3>{ev.title}</h3>
            <p>
              📍 {ev.location} — {new Date(ev.date).toLocaleDateString()} —{" "}
              {ev.registeredCount} registered
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

// ==========================================
// STUDY MATERIALS TAB
// ==========================================

function MaterialsTab() {
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    type: "PDF",
    facultyName: "",
    description: "",
    resourceUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => {
    getAllMaterials()
      .then((data) => setMaterials(data.materials || []))
      .catch(() => {});
  };

  useEffect(load, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createMaterial(form);
      setMsg({ type: "success", text: "Material uploaded successfully." });
      setForm({
        title: "",
        subject: "",
        type: "PDF",
        facultyName: "",
        description: "",
        resourceUrl: "",
      });
      load();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not upload material" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="complaint-form-card">
        <h2>Upload Study Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>PDF</option>
              <option>Video</option>
              <option>Link</option>
            </select>
          </div>
          <div className="form-group">
            <label>Faculty Name</label>
            <input
              name="facultyName"
              value={form.facultyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Resource URL</label>
            <input
              name="resourceUrl"
              value={form.resourceUrl}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>
          <button type="submit" disabled={saving}>
            {saving ? "Uploading..." : "Upload Material"}
          </button>
        </form>
        <Message text={msg?.text} type={msg?.type} />
      </div>

      <div className="complaint-history">
        <h2>All Materials ({materials.length})</h2>
        {materials.map((m) => (
          <div className="complaint-card" key={m._id}>
            <h3>{m.title}</h3>
            <p>{m.subject} — {m.type} — by {m.facultyName}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ==========================================
// TIMETABLE TAB
// ==========================================

function TimetableTab() {
  const [form, setForm] = useState({
    day: "Monday",
    time: "",
    subject: "",
    code: "",
    facultyName: "",
    room: "",
    type: "Lecture",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createTimetableEntry(form);
      setMsg({ type: "success", text: "Timetable entry added successfully." });
      setForm({ ...form, time: "", subject: "", code: "", room: "" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not add entry" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="complaint-form-card">
      <h2>Add Timetable Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Day</label>
          <select name="day" value={form.day} onChange={handleChange}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
              (d) => (
                <option key={d}>{d}</option>
              )
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="e.g. 09:00 - 10:00"
            required
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Subject Code</label>
          <input name="code" value={form.code} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Faculty Name</label>
          <input name="facultyName" value={form.facultyName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Room</label>
          <input name="room" value={form.room} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option>Lecture</option>
            <option>Practical</option>
            <option>Break</option>
          </select>
        </div>
        <button type="submit" disabled={saving}>
          {saving ? "Adding..." : "Add Entry"}
        </button>
      </form>
      <Message text={msg?.text} type={msg?.type} />
    </div>
  );
}

// ==========================================
// COMPLAINTS TAB
// ==========================================

function ComplaintsTab() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    getAllComplaints()
      .then((data) => setComplaints(data.complaints || []))
      .catch((err) => setError(err.message || "Could not load complaints"));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateComplaintStatus(id, status);
      load();
    } catch (err) {
      setError(err.message || "Could not update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="complaint-history">
      <h2>All Complaints ({complaints.length})</h2>
      <Message text={error} type="error" />
      {complaints.map((c) => (
        <div className="complaint-card" key={c._id}>
          <h3>{c.subject}</h3>
          <p>{c.category} — 📍 {c.location}</p>
          <p>{c.description}</p>
          <div className="form-group" style={{ maxWidth: "220px" }}>
            <label>Status</label>
            <select
              value={c.status}
              disabled={updatingId === c._id}
              onChange={(e) => handleStatusChange(c._id, e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// PLACEMENTS TAB (Admin only)
// ==========================================

function PlacementsTab() {
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    type: "Full Time",
    location: "",
    salary: "",
    eligibility: "",
    deadline: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => {
    getAllPlacements()
      .then((data) => setPlacements(data.placements || []))
      .catch(() => {});
  };

  useEffect(load, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createPlacement(form);
      setMsg({ type: "success", text: "Placement posted successfully." });
      setForm({
        company: "",
        role: "",
        type: "Full Time",
        location: "",
        salary: "",
        eligibility: "",
        deadline: "",
      });
      load();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not post placement" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="complaint-form-card">
        <h2>Post a Placement / Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input name="role" value={form.role} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Full Time</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. 6-8 LPA"
              required
            />
          </div>
          <div className="form-group">
            <label>Eligibility</label>
            <input
              name="eligibility"
              value={form.eligibility}
              onChange={handleChange}
              placeholder="e.g. CSE/IT, 7+ CGPA"
              required
            />
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={saving}>
            {saving ? "Posting..." : "Post Placement"}
          </button>
        </form>
        <Message text={msg?.text} type={msg?.type} />
      </div>

      <div className="complaint-history">
        <h2>All Placements ({placements.length})</h2>
        {placements.map((p) => (
          <div className="complaint-card" key={p._id}>
            <h3>{p.company} — {p.role}</h3>
            <p>
              {p.type} — 📍 {p.location} — {p.salary} — {p.applicantCount} applicants
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default FacultyDashboard;
