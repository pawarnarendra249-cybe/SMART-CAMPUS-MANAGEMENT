import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getAllMaterials } from "../services/studyMaterialService";

function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("All");
  const [type, setType] = useState("All");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMaterials() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllMaterials();
      setMaterials(data.materials);
    } catch (err) {
      setError(err.message || "Could not load study materials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMaterials();
  }, []);

  const subjectOptions = [...new Set(materials.map((m) => m.subject))];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = subject === "All" || material.subject === subject;
    const matchesType = type === "All" || material.type === type;

    return matchesSearch && matchesSubject && matchesType;
  });

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

        <div className="page-header">
          <h1>Study Materials</h1>
          <p>Access notes, lectures, and useful learning resources.</p>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Search and Filters */}

        <div className="material-controls">
          <div className="material-search">
            🔍
            <input
              type="text"
              placeholder="Search study materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="All">All Subjects</option>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Link">Link</option>
          </select>
        </div>

        {/* Materials Count */}

        <div className="materials-count">
          <strong>{filteredMaterials.length}</strong> learning resources available
        </div>

        {/* Materials Grid */}

        {loading ? (
          <p>Loading materials...</p>
        ) : (
          <div className="materials-grid">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <div className="material-card" key={material._id}>
                  <div className="material-card-header">
                    <div className={`material-icon ${material.type.toLowerCase()}`}>
                      {material.type === "PDF"
                        ? "📄"
                        : material.type === "Video"
                        ? "🎥"
                        : "🔗"}
                    </div>
                    <span className="material-type">{material.type}</span>
                  </div>

                  <div className="material-content">
                    <span className="material-subject">{material.subject}</span>
                    <h2>{material.title}</h2>
                    <p>{material.description}</p>
                  </div>

                  <div className="material-footer">
                    <div className="material-info">
                      <span>👨‍🏫 {material.facultyName}</span>
                      <span>📅 {formatDate(material.createdAt)}</span>
                    </div>

                    <div className="material-actions">
                      <a
                        href={material.resourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="view-material-btn"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-materials">
                <h2>No Materials Found</h2>
                <p>Try changing your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudyMaterials;
