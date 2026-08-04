import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";

function Notices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const notices = [
    {
      id: 1,
      title: "Semester Examination Notice",
      category: "Examination",
      date: "01 August 2026",
      description:
        "The semester examination schedule has been released. Students are requested to check the examination timetable and prepare accordingly.",
      important: true,
    },
    {
      id: 2,
      title: "Assignment Submission Deadline",
      category: "Academic",
      date: "10 August 2026",
      description:
        "All students must submit their pending assignments before the deadline. Late submissions may not be accepted.",
      important: true,
    },
    {
      id: 3,
      title: "College Campus Maintenance",
      category: "General",
      date: "12 August 2026",
      description:
        "The college campus will undergo scheduled maintenance work. Students are requested to cooperate with the administration.",
      important: false,
    },
    {
      id: 4,
      title: "Library Timing Update",
      category: "General",
      date: "15 August 2026",
      description:
        "The library timings have been updated. Students can now access library services during the revised working hours.",
      important: false,
    },
  ];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notice.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || notice.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header">
          <div>
            <h1>Campus Notices</h1>
            <p>
              Stay updated with the latest college announcements.
            </p>
          </div>
        </div>


        {/* Search and Filter */}

        <div className="notice-controls">

          <div className="notice-search">
            🔍

            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>


          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Examination">
              Examination
            </option>
            <option value="General">General</option>
          </select>

        </div>


        {/* Important Notices */}

        <div className="important-notice">
          <div className="important-icon">
            📌
          </div>

          <div>
            <h3>Important Announcement</h3>

            <p>
              Please regularly check the notices section
              for important academic and campus updates.
            </p>
          </div>
        </div>


        {/* Notice List */}

        <div className="notices-list">

          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div
                className="notice-card"
                key={notice.id}
              >

                <div className="notice-card-top">

                  <div className="notice-card-icon">
                    📢
                  </div>

                  <div className="notice-card-content">

                    <div className="notice-meta">

                      <span className="notice-category">
                        {notice.category}
                      </span>

                      {notice.important && (
                        <span className="important-badge">
                          Important
                        </span>
                      )}

                    </div>

                    <h2>{notice.title}</h2>

                    <p>
                      {notice.description}
                    </p>

                    <span className="notice-date">
                      📅 {notice.date}
                    </span>

                  </div>

                </div>

                <button className="read-more-btn">
                  Read More →
                </button>

              </div>
            ))
          ) : (
            <div className="no-notices">
              <h2>No Notices Found</h2>
              <p>
                Try changing your search or category filter.
              </p>
            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Notices;