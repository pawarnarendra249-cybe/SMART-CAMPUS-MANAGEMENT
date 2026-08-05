import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { submitComplaint, getMyComplaints } from "../services/complaintService";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    location: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function loadComplaints() {
    setLoading(true);
    setError("");
    try {
      const data = await getMyComplaints();
      setComplaints(data.complaints);
    } catch (err) {
      setError(err.message || "Could not load complaints");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.subject || !formData.location || !formData.description) {
      setError("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitComplaint(formData);
      setFormData({ category: "", subject: "", location: "", description: "" });
      setShowForm(false);
      loadComplaints();
    } catch (err) {
      setError(err.message || "Could not submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <DashboardLayout>
      <div className="page-container">
        {/* Page Header */}

        <div className="page-header complaint-header">
          <div>
            <h1>Helpdesk & Complaints</h1>
            <p>Report issues and track your complaints.</p>
          </div>

          <button className="new-complaint-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "✕ Close" : "+ New Complaint"}
          </button>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Complaint Form */}

        {showForm && (
          <div className="complaint-form-card">
            <h2>Submit a New Complaint</h2>
            <p>Provide details about the issue you are facing.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Complaint Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Library">Library</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter complaint subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Example: Room 201"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe your issue..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-complaint-btn" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </div>
        )}

        {/* Complaint Statistics */}

        <div className="complaint-stats">
          <div className="complaint-stat-card">
            <span>📋</span>
            <div>
              <p>Total Complaints</p>
              <h2>{complaints.length}</h2>
            </div>
          </div>

          <div className="complaint-stat-card">
            <span>⏳</span>
            <div>
              <p>Pending</p>
              <h2>{complaints.filter((c) => c.status === "Pending").length}</h2>
            </div>
          </div>

          <div className="complaint-stat-card">
            <span>🔄</span>
            <div>
              <p>In Progress</p>
              <h2>{complaints.filter((c) => c.status === "In Progress").length}</h2>
            </div>
          </div>

          <div className="complaint-stat-card">
            <span>✅</span>
            <div>
              <p>Resolved</p>
              <h2>{complaints.filter((c) => c.status === "Resolved").length}</h2>
            </div>
          </div>
        </div>

        {/* Complaint History */}

        <div className="complaints-section">
          <div className="section-header">
            <div>
              <h2>My Complaints</h2>
              <p>Track the status of your submitted complaints.</p>
            </div>
          </div>

          {loading ? (
            <p>Loading complaints...</p>
          ) : (
            <div className="complaints-list">
              {complaints.map((complaint) => (
                <div className="complaint-card" key={complaint._id}>
                  <div className="complaint-card-top">
                    <div>
                      <span className="complaint-id">
                        {complaint._id.slice(-6).toUpperCase()}
                      </span>
                      <h3>{complaint.subject}</h3>
                    </div>

                    <span
                      className={`complaint-status ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <p className="complaint-description">{complaint.description}</p>

                  <div className="complaint-meta">
                    <span>🏷️ {complaint.category}</span>
                    <span>📍 {complaint.location}</span>
                    <span>📅 {formatDate(complaint.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Complaints;
