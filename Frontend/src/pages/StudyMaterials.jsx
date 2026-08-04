import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("All");
  const [type, setType] = useState("All");

  const materials = [
    {
      id: 1,
      title: "Database Management System Notes",
      subject: "DBMS",
      type: "PDF",
      faculty: "Prof. Sharma",
      date: "01 August 2026",
      description:
        "Complete notes covering DBMS fundamentals, relational models, SQL, normalization, and transactions.",
    },
    {
      id: 2,
      title: "Operating System Unit 1",
      subject: "Operating System",
      type: "PDF",
      faculty: "Prof. Patil",
      date: "03 August 2026",
      description:
        "Study material covering operating system fundamentals, processes, system calls, and process management.",
    },
    {
      id: 3,
      title: "Theory of Computation Lecture",
      subject: "Theory of Computation",
      type: "Video",
      faculty: "Prof. Deshmukh",
      date: "05 August 2026",
      description:
        "Video lecture explaining finite automata, regular languages, and deterministic finite automata.",
    },
    {
      id: 4,
      title: "Computer Networks Reference",
      subject: "Computer Networks",
      type: "Link",
      faculty: "Prof. Joshi",
      date: "07 August 2026",
      description:
        "Useful online reference material for understanding networking concepts and protocols.",
    },
    {
      id: 5,
      title: "DBMS SQL Practice Questions",
      subject: "DBMS",
      type: "PDF",
      faculty: "Prof. Sharma",
      date: "08 August 2026",
      description:
        "Practice questions covering SQL queries, joins, views, and database operations.",
    },
    {
      id: 6,
      title: "OS Process Scheduling Lecture",
      subject: "Operating System",
      type: "Video",
      faculty: "Prof. Patil",
      date: "10 August 2026",
      description:
        "Detailed lecture about CPU scheduling algorithms including FCFS, SJF, Priority, and Round Robin.",
    },
  ];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      material.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSubject =
      subject === "All" || material.subject === subject;

    const matchesType =
      type === "All" || material.type === type;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesType
    );
  });

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header">
          <h1>Study Materials</h1>

          <p>
            Access notes, lectures, and useful learning resources.
          </p>
        </div>


        {/* Search and Filters */}

        <div className="material-controls">

          <div className="material-search">
            🔍

            <input
              type="text"
              placeholder="Search study materials..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>


          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          >
            <option value="All">
              All Subjects
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="Operating System">
              Operating System
            </option>

            <option value="Theory of Computation">
              Theory of Computation
            </option>

            <option value="Computer Networks">
              Computer Networks
            </option>
          </select>


          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="All">
              All Types
            </option>

            <option value="PDF">
              PDF
            </option>

            <option value="Video">
              Video
            </option>

            <option value="Link">
              Link
            </option>
          </select>

        </div>


        {/* Materials Count */}

        <div className="materials-count">
          <strong>
            {filteredMaterials.length}
          </strong>{" "}
          learning resources available
        </div>


        {/* Materials Grid */}

        <div className="materials-grid">

          {filteredMaterials.length > 0 ? (

            filteredMaterials.map((material) => (

              <div
                className="material-card"
                key={material.id}
              >

                {/* Card Header */}

                <div className="material-card-header">

                  <div
                    className={`material-icon ${material.type.toLowerCase()}`}
                  >
                    {material.type === "PDF"
                      ? "📄"
                      : material.type === "Video"
                      ? "🎥"
                      : "🔗"}
                  </div>

                  <span className="material-type">
                    {material.type}
                  </span>

                </div>


                {/* Content */}

                <div className="material-content">

                  <span className="material-subject">
                    {material.subject}
                  </span>

                  <h2>
                    {material.title}
                  </h2>

                  <p>
                    {material.description}
                  </p>

                </div>


                {/* Footer */}

                <div className="material-footer">

                  <div className="material-info">

                    <span>
                      👨‍🏫 {material.faculty}
                    </span>

                    <span>
                      📅 {material.date}
                    </span>

                  </div>


                  {/* Actions */}

                  <div className="material-actions">

                    <button className="view-material-btn">
                      View
                    </button>

                    <button className="download-material-btn">
                      Download
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="no-materials">

              <h2>
                No Materials Found
              </h2>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default StudyMaterials;