import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Placements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("All");

  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Tech Solutions Pvt. Ltd.",
      role: "Full Stack Developer",
      type: "Full Time",
      location: "Pune",
      salary: "₹6 - 8 LPA",
      eligibility: "B.E / B.Tech - CSE / IT",
      deadline: "20 August 2026",
      applied: false,
    },
    {
      id: 2,
      company: "CloudTech Systems",
      role: "Cloud Engineer",
      type: "Full Time",
      location: "Mumbai",
      salary: "₹7 - 10 LPA",
      eligibility: "B.E / B.Tech - CSE",
      deadline: "25 August 2026",
      applied: false,
    },
    {
      id: 3,
      company: "CyberSecure Technologies",
      role: "Cyber Security Intern",
      type: "Internship",
      location: "Remote",
      salary: "₹20,000 / Month",
      eligibility: "CSE / IT Students",
      deadline: "28 August 2026",
      applied: false,
    },
    {
      id: 4,
      company: "Data Analytics India",
      role: "Data Analyst",
      type: "Full Time",
      location: "Bangalore",
      salary: "₹5 - 7 LPA",
      eligibility: "B.E / B.Tech / MCA",
      deadline: "30 August 2026",
      applied: false,
    },
    {
      id: 5,
      company: "WebWorks Technologies",
      role: "Frontend Developer Intern",
      type: "Internship",
      location: "Remote",
      salary: "₹15,000 / Month",
      eligibility: "CSE / IT Students",
      deadline: "05 September 2026",
      applied: false,
    },
    {
      id: 6,
      company: "Innovate Labs",
      role: "Software Developer",
      type: "Full Time",
      location: "Hyderabad",
      salary: "₹8 - 12 LPA",
      eligibility: "B.E / B.Tech - CSE / IT",
      deadline: "10 September 2026",
      applied: false,
    },
  ]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      jobType === "All" ||
      job.type === jobType;

    return matchesSearch && matchesType;
  });

  const handleApply = (id) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              applied: !job.applied,
            }
          : job
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header">
          <h1>Campus Placements</h1>

          <p>
            Explore job opportunities and start your career journey.
          </p>
        </div>


        {/* Search and Filter */}

        <div className="placement-controls">

          <div className="placement-search">
            🔍

            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>


          <select
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value)
            }
          >
            <option value="All">
              All Job Types
            </option>

            <option value="Full Time">
              Full Time
            </option>

            <option value="Internship">
              Internship
            </option>
          </select>

        </div>


        {/* Job Count */}

        <div className="placement-count">
          <strong>
            {filteredJobs.length}
          </strong>{" "}
          opportunities available
        </div>


        {/* Job Cards */}

        <div className="jobs-grid">

          {filteredJobs.length > 0 ? (

            filteredJobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >

                {/* Company Header */}

                <div className="job-card-header">

                  <div className="company-logo">
                    {job.company.charAt(0)}
                  </div>

                  <div>
                    <h3>
                      {job.company}
                    </h3>

                    <span className="job-type">
                      {job.type}
                    </span>
                  </div>

                </div>


                {/* Job Information */}

                <div className="job-content">

                  <h2>
                    {job.role}
                  </h2>

                  <div className="job-details">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💰 {job.salary}
                    </span>

                    <span>
                      🎓 {job.eligibility}
                    </span>

                    <span>
                      📅 Apply before {job.deadline}
                    </span>

                  </div>

                </div>


                {/* Apply Button */}

                <button
                  className={
                    job.applied
                      ? "applied-job-btn"
                      : "apply-job-btn"
                  }
                  onClick={() =>
                    handleApply(job.id)
                  }
                >
                  {job.applied
                    ? "✓ Applied"
                    : "Apply Now"}
                </button>

              </div>

            ))

          ) : (

            <div className="no-jobs">

              <h2>
                No Opportunities Found
              </h2>

              <p>
                Try changing your search or job type filter.
              </p>

            </div>

          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Placements;