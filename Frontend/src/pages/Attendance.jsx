import DashboardLayout from "../components/DashboardLayout";

function Attendance() {
  const subjects = [
    {
      id: 1,
      name: "Database Management System",
      code: "DBMS",
      attended: 42,
      total: 48,
    },
    {
      id: 2,
      name: "Operating System",
      code: "OS",
      attended: 38,
      total: 45,
    },
    {
      id: 3,
      name: "Theory of Computation",
      code: "TOC",
      attended: 35,
      total: 40,
    },
    {
      id: 4,
      name: "Computer Networks",
      code: "CN",
      attended: 32,
      total: 40,
    },
    {
      id: 5,
      name: "Engineering Mathematics",
      code: "M4",
      attended: 36,
      total: 42,
    },
  ];

  const totalAttended = subjects.reduce(
    (sum, subject) => sum + subject.attended,
    0
  );

  const totalClasses = subjects.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const totalAbsent = totalClasses - totalAttended;

  const overallPercentage = Math.round(
    (totalAttended / totalClasses) * 100
  );

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header">
          <h1>Attendance Overview</h1>

          <p>
            Track your attendance and monitor your academic progress.
          </p>
        </div>


        {/* Attendance Summary */}

        <div className="attendance-summary">

          <div className="attendance-overall-card">

            <div className="attendance-circle">
              <span>{overallPercentage}%</span>
            </div>

            <div>
              <h2>Overall Attendance</h2>

              <p>
                {overallPercentage >= 75
                  ? "Your attendance is good."
                  : "Your attendance needs improvement."}
              </p>
            </div>

          </div>


          <div className="attendance-stat-card">

            <div className="attendance-stat-icon">
              ✅
            </div>

            <div>
              <span>Present</span>
              <h2>{totalAttended}</h2>
            </div>

          </div>


          <div className="attendance-stat-card">

            <div className="attendance-stat-icon">
              ❌
            </div>

            <div>
              <span>Absent</span>
              <h2>{totalAbsent}</h2>
            </div>

          </div>


          <div className="attendance-stat-card">

            <div className="attendance-stat-icon">
              📚
            </div>

            <div>
              <span>Total Classes</span>
              <h2>{totalClasses}</h2>
            </div>

          </div>

        </div>


        {/* Subject Attendance */}

        <div className="attendance-section">

          <div className="section-header">
            <h2>Subject-wise Attendance</h2>

            <span>
              Minimum Required: 75%
            </span>
          </div>


          <div className="attendance-list">

            {subjects.map((subject) => {

              const percentage = Math.round(
                (subject.attended / subject.total) * 100
              );

              const status =
                percentage >= 75
                  ? "Good"
                  : "Low";

              return (

                <div
                  className="attendance-subject"
                  key={subject.id}
                >

                  <div className="subject-info">

                    <div>
                      <span className="subject-code">
                        {subject.code}
                      </span>

                      <h3>
                        {subject.name}
                      </h3>
                    </div>

                    <div className="subject-percentage">
                      <strong>
                        {percentage}%
                      </strong>

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
                        percentage >= 75
                          ? "progress-bar good"
                          : "progress-bar low"
                      }
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>

                  </div>


                  <div className="attendance-details">

                    <span>
                      Present: {subject.attended}
                    </span>

                    <span>
                      Total Classes: {subject.total}
                    </span>

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Attendance;