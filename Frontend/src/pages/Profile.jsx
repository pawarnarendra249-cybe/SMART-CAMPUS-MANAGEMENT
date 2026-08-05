import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getUser } from "../utils/auth";
import {
  getMyProfile,
  createMyProfile,
  updateMyProfile,
  deleteMyProfile,
} from "../services/studentService";

// Fields that actually exist in the backend StudentProfile model.
// (CGPA / attendance % / skills are UI placeholders until those
// modules — Academics/Attendance — are built on the backend.)
const emptyForm = {
  studentId: "",
  phone: "",
  department: "",
  branch: "",
  semester: "",
  division: "",
  address: "",
};

function Profile() {
  const currentUser = getUser(); // { id, name, email, role } from login

  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  async function loadProfile() {
    setLoading(true);
    setError("");

    try {
      const data = await getMyProfile();
      const p = data.profile;

      setFormData({
        studentId: p.studentId || "",
        phone: p.phone || "",
        department: p.department || "",
        branch: p.branch || "",
        semester: p.semester || "",
        division: p.division || "",
        address: p.address || "",
      });

      setProfileExists(true);
    } catch (err) {
      if (err.status === 404) {
        // No profile yet -> show the create form
        setProfileExists(false);
        setIsEditing(true);
      } else {
        setError(err.message || "Could not load profile");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      if (profileExists) {
        await updateMyProfile(formData);
      } else {
        await createMyProfile(formData);
        setProfileExists(true);
      }
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Could not save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your student profile? This cannot be undone."
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteMyProfile();
      setFormData(emptyForm);
      setProfileExists(false);
      setIsEditing(true);
    } catch (err) {
      setError(err.message || "Could not delete profile");
    } finally {
      setDeleting(false);
    }
  };

  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((w) => w.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  if (loading) {
    return (
      <DashboardLayout>
        <p style={{ padding: "2rem" }}>Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile-page">
        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* ================================= 
            PROFILE HERO
        ================================= */}

        <div className="profile-hero">
          <div className="profile-hero-content">
            <div className="profile-avatar">{initials}</div>

            <div className="profile-identity">
              <h1>{currentUser?.name || "Your Name"}</h1>
              <p>{formData.department || "Department not set"}</p>
              <span>
                Student ID: {formData.studentId || "Not set"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="profile-edit-btn"
              disabled={saving}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {saving
                ? "Saving..."
                : isEditing
                ? "✓ Save Profile"
                : "✏️ Edit Profile"}
            </button>

            {profileExists && (
              <button
                className="profile-edit-btn"
                style={{ background: "#dc2626" }}
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting ? "Deleting..." : "🗑️ Delete Profile"}
              </button>
            )}
          </div>
        </div>

        {!profileExists && (
          <p style={{ color: "#b8860b" }}>
            You don't have a student profile yet. Fill in the details below
            and click "Save Profile" to create one.
          </p>
        )}

        {/* ================================= 
            QUICK INFORMATION
        ================================= */}

        <div className="profile-main-grid">
          <div className="profile-card quick-info-card">
            <div className="profile-card-title">
              <div>
                <h2>Quick Information</h2>
                <p>Your basic contact information</p>
              </div>
              <span className="card-icon">👤</span>
            </div>

            <div className="quick-info-list">
              <div className="quick-info-item">
                <span className="info-icon">📧</span>
                <div>
                  <small>Email Address</small>
                  <strong>{currentUser?.email || "-"}</strong>
                </div>
              </div>

              <div className="quick-info-item">
                <span className="info-icon">📱</span>
                <div>
                  <small>Phone Number</small>
                  <strong>{formData.phone || "-"}</strong>
                </div>
              </div>

              <div className="quick-info-item">
                <span className="info-icon">🏫</span>
                <div>
                  <small>Department</small>
                  <strong>{formData.department || "-"}</strong>
                </div>
              </div>

              <div className="quick-info-item">
                <span className="info-icon">🎯</span>
                <div>
                  <small>Role</small>
                  <strong style={{ textTransform: "capitalize" }}>
                    {currentUser?.role || "-"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================= 
            PERSONAL / ACADEMIC INFORMATION (editable)
        ================================= */}

        <div className="profile-card personal-info-card">
          <div className="profile-card-title">
            <div>
              <h2>Academic & Personal Information</h2>
              <p>Manage your student profile details</p>
            </div>
            <span className="card-icon">📋</span>
          </div>

          <div className="profile-form-grid">
            <div className="profile-form-group">
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                disabled={!isEditing || profileExists}
                onChange={handleChange}
                placeholder="e.g. CSE2026001"
              />
            </div>

            <div className="profile-form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
              />
            </div>

            <div className="profile-form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="e.g. Computer Engineering"
              />
            </div>

            <div className="profile-form-group">
              <label>Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="e.g. CSE"
              />
            </div>

            <div className="profile-form-group">
              <label>Semester</label>
              <input
                type="number"
                name="semester"
                value={formData.semester}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="e.g. 5"
              />
            </div>

            <div className="profile-form-group">
              <label>Division</label>
              <input
                type="text"
                name="division"
                value={formData.division}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="e.g. A"
              />
            </div>

            <div className="profile-form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Your address"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
