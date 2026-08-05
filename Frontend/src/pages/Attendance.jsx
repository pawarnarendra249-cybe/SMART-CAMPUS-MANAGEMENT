import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getMyAttendance } from "../services/attendanceService";

function Attendance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [overall, setOverall] = useState({
    totalClasses: 0,
    totalPresent: 0,
    totalAbsent: 0,
    percentage: 0,
  });
  const [subjects, setSubjects] = useState([]);

  async function loadAttendance() {
    setLoading(true);
    setError("");

    try {
      const data = await getMyAttendance();

      console.log("Attendance API Response:", data);

      setOverall(data.overall);
      setSubjects(data.subjects);
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not load attendance");
    } finally {
      console.log("Loading finished");
      setLoading(false);
    }
  }

  // ✅ useEffect should always be before any conditional return
  useEffect(() => {
    loadAttendance();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p style={{ padding: "2rem" }}>Loading attendance...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}
        <div className="page-header">
          <h1>Attendance Overview</h1>
          <p>Track your attendance and monitor your academic progress.</p>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {!error && overall.totalClasses === 0 && (
          <p style={{ color: "#b8860b" }}>
            No attendance records yet. Once faculty starts marking your
            attendance, it will show up here automatically.
          </p>
        )}

        {/* Attendance Summary */}
        <div className="attendance-summary">

          <div className="attendance-overall-card">
            <div className="attendance-circle">
              <span>{overall.percentage}%</span>
            </div>

            <div>
              <h2>Overall Attendance</h2>
              <p>
                {overall.totalClasses === 0
                  ? "No classes recorded yet."
                  : overall.percentage >= 75
                  ? "Your attendance is good."
                  : "Your attendance needs improvement."}
              </p>
            </div>
          </div>

          <div className="attendance-stat-card">
            <div className="attendance-stat-icon">✅</div>
            <div>
              <span>Present</span>
              <h2>{overall.totalPresent}</h2>
            </div>
          </div>

          <div className="attendance-stat-card">
            <div className="attendance-stat-icon">❌</div>
            <div>
              <span>Absent</span>
              <h2>{overall.totalAbsent}</h2>
            </div>
          </div>

          <div className="attendance-stat-card">
            <div className="attendance-stat-icon">📚</div>
            <div>
              <span>Total Classes</span>
              <h2>{overall.totalClasses}</h2>
            </div>
          </div>

        </div>

        {/* Subject-wise Attendance */}
        {subjects.length > 0 && (
          <div className="attendance-section">

            <div className="section-header">
              <h2>Subject-wise Attendance</h2>
              <span>Minimum Required: 75%</span>
            </div>

            <div className="attendance-list">
              {subjects.map((subject) => {
                const status = subject.percentage >= 75 ? "Good" : "Low";

                return (
                  <div
                    className="attendance-subject"
                    key={subject.subjectCode}
                  >
                    <div className="subject-info">
                      <div>
                        <span className="subject-code">
                          {subject.subjectCode}
                        </span>
                        <h3>{subject.subjectName}</h3>
                      </div>

                      <div className="subject-percentage">
                        <strong>{subject.percentage}%</strong>

                        <span
                          className={
                            status === "Good"
                              ? "attendance-good"
                              : "attendance-low"
                          }
                        >
                          {status}
                        </span>
                      </div>
                    </div>

                    <div className="progress-container">
                      <div
                        className={
                          subject.percentage >= 75
                            ? "progress-bar good"
                            : "progress-bar low"
                        }
                        style={{
                          width: `${subject.percentage}%`,
                        }}
                      ></div>
                    </div>

                    <div className="attendance-details">
                      <span>Present: {subject.present}</span>
                      <span>Total Classes: {subject.totalClasses}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Attendance;