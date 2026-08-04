import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Complaints() {
  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      category: "Infrastructure",
      subject: "Projector not working",
      location: "Room 201",
      description:
        "The projector in Room 201 is not working properly during lectures.",
      status: "In Progress",
      date: "01 August 2026",
    },
    {
      id: "CMP002",
      category: "IT Support",
      subject: "Wi-Fi connectivity issue",
      location: "Computer Lab 1",
      description:
        "Internet connection is frequently disconnecting in the computer lab.",
      status: "Pending",
      date: "03 August 2026",
    },
    {
      id: "CMP003",
      category: "Cleanliness",
      subject: "Classroom cleaning required",
      location: "Room 203",
      description:
        "The classroom needs cleaning before the next lecture.",
      status: "Resolved",
      date: "28 July 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    location: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.subject ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newComplaint = {
      id: `CMP${String(complaints.length + 1).padStart(3, "0")}`,
      category: formData.category,
      subject: formData.subject,
      location: formData.location,
      description: formData.description,
      status: "Pending",
      date: new Date().toLocaleDateString("en-GB"),
    };

    setComplaints([
      newComplaint,
      ...complaints,
    ]);

    setFormData({
      category: "",
      subject: "",
      location: "",
      description: "",
    });

    setShowForm(false);

    alert("Complaint submitted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header complaint-header">

          <div>
            <h1>Helpdesk & Complaints</h1>

            <p>
              Report issues and track your complaints.
            </p>
          </div>

          <button
            className="new-complaint-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? "✕ Close"
              : "+ New Complaint"}
          </button>

        </div>


        {/* Complaint Form */}

        {showForm && (

          <div className="complaint-form-card">

            <h2>Submit a New Complaint</h2>

            <p>
              Provide details about the issue you are facing.
            </p>


            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                {/* Category */}

                <div className="form-group">

                  <label>
                    Complaint Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Infrastructure">
                      Infrastructure
                    </option>

                    <option value="IT Support">
                      IT Support
                    </option>

                    <option value="Cleanliness">
                      Cleanliness
                    </option>

                    <option value="Library">
                      Library
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                </div>


                {/* Subject */}

                <div className="form-group">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter complaint subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                </div>


                {/* Location */}

                <div className="form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Example: Room 201"
                    value={formData.location}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* Description */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe your issue..."
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="submit-complaint-btn"
              >
                Submit Complaint
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

              <h2>
                {
                  complaints.filter(
                    (item) =>
                      item.status === "Pending"
                  ).length
                }
              </h2>

            </div>

          </div>


          <div className="complaint-stat-card">

            <span>🔄</span>

            <div>
              <p>In Progress</p>

              <h2>
                {
                  complaints.filter(
                    (item) =>
                      item.status === "In Progress"
                  ).length
                }
              </h2>

            </div>

          </div>


          <div className="complaint-stat-card">

            <span>✅</span>

            <div>
              <p>Resolved</p>

              <h2>
                {
                  complaints.filter(
                    (item) =>
                      item.status === "Resolved"
                  ).length
                }
              </h2>

            </div>

          </div>

        </div>


        {/* Complaint History */}

        <div className="complaints-section">

          <div className="section-header">

            <div>
              <h2>My Complaints</h2>

              <p>
                Track the status of your submitted complaints.
              </p>
            </div>

          </div>


          <div className="complaints-list">

            {complaints.map((complaint) => (

              <div
                className="complaint-card"
                key={complaint.id}
              >

                <div className="complaint-card-top">

                  <div>

                    <span className="complaint-id">
                      {complaint.id}
                    </span>

                    <h3>
                      {complaint.subject}
                    </h3>

                  </div>


                  <span
                    className={`complaint-status ${complaint.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {complaint.status}
                  </span>

                </div>


                <p className="complaint-description">
                  {complaint.description}
                </p>


                <div className="complaint-meta">

                  <span>
                    🏷️ {complaint.category}
                  </span>

                  <span>
                    📍 {complaint.location}
                  </span>

                  <span>
                    📅 {complaint.date}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Complaints;