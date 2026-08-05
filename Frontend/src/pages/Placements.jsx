import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getAllPlacements, toggleApplication } from "../services/placementService";

function Placements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadJobs() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllPlacements();
      setJobs(data.placements);
    } catch (err) {
      setError(err.message || "Could not load placements");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = jobType === "All" || job.type === jobType;

    return matchesSearch && matchesType;
  });

  const handleApply = async (id) => {
    setJobs((current) =>
      current.map((job) => (job._id === id ? { ...job, applied: !job.applied } : job))
    );

    try {
      await toggleApplication(id);
    } catch (err) {
      setError(err.message || "Could not update application");
      loadJobs();
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

        <div className="page-header">
          <h1>Campus Placements</h1>
          <p>Explore job opportunities and start your career journey.</p>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Search and Filter */}

        <div className="placement-controls">
          <div className="placement-search">
            🔍
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="All">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Job Count */}

        <div className="placement-count">
          <strong>{filteredJobs.length}</strong> opportunities available
        </div>

        {/* Job Cards */}

        {loading ? (
          <p>Loading placements...</p>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-card" key={job._id}>
                  <div className="job-card-header">
                    <div className="company-logo">{job.company.charAt(0)}</div>

                    <div>
                      <h3>{job.company}</h3>
                      <span className="job-type">{job.type}</span>
                    </div>
                  </div>

                  <div className="job-content">
                    <h2>{job.role}</h2>

                    <div className="job-details">
                      <span>📍 {job.location}</span>
                      <span>💰 {job.salary}</span>
                      <span>🎓 {job.eligibility}</span>
                      <span>📅 Apply before {formatDate(job.deadline)}</span>
                    </div>
                  </div>

                  <button
                    className={job.applied ? "applied-job-btn" : "apply-job-btn"}
                    onClick={() => handleApply(job._id)}
                  >
                    {job.applied ? "✓ Applied" : "Apply Now"}
                  </button>
                </div>
              ))
            ) : (
              <div className="no-jobs">
                <h2>No Opportunities Found</h2>
                <p>Try changing your search or job type filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Placements;
