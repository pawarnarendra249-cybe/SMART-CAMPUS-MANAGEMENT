import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Narendra",
    lastName: "Pawar",
    email: "narendra@example.com",
    phone: "+91 98765 43210",
    studentId: "CSE2026001",
    department: "Computer Engineering",
    semester: "4th Semester",
    division: "A",
    cgpa: "8.2",
    joinedYear: "2024",
  });

  const [skills, setSkills] = useState([
    "React.js",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Python",
    "Cloud Computing",
  ]);

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const addSkill = () => {
    if (
      newSkill.trim() !== "" &&
      !skills.includes(newSkill.trim())
    ) {
      setSkills([
        ...skills,
        newSkill.trim(),
      ]);

      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter(
        (skill) => skill !== skillToRemove
      )
    );
  };

  return (
    <DashboardLayout>

      <div className="profile-page">

        {/* =================================
            PROFILE HERO
        ================================= */}

        <div className="profile-hero">

          <div className="profile-hero-content">

            <div className="profile-avatar">
              {profile.firstName.charAt(0)}
              {profile.lastName.charAt(0)}
            </div>

            <div className="profile-identity">

              <h1>
                {profile.firstName}{" "}
                {profile.lastName}
              </h1>

              <p>
                {profile.department}
              </p>

              <span>
                Student ID: {profile.studentId}
              </span>

            </div>

          </div>


          <button
            className="profile-edit-btn"
            onClick={() =>
              isEditing
                ? handleSave()
                : setIsEditing(true)
            }
          >
            {isEditing
              ? "✓ Save Profile"
              : "✏️ Edit Profile"}
          </button>

        </div>


        {/* =================================
            PROFILE GRID
        ================================= */}

        <div className="profile-main-grid">


          {/* =================================
              QUICK INFORMATION
          ================================= */}

          <div className="profile-card quick-info-card">

            <div className="profile-card-title">

              <div>
                <h2>Quick Information</h2>

                <p>
                  Your basic contact information
                </p>
              </div>

              <span className="card-icon">
                👤
              </span>

            </div>


            <div className="quick-info-list">

              <div className="quick-info-item">

                <span className="info-icon">
                  📧
                </span>

                <div>
                  <small>Email Address</small>
                  <strong>
                    {profile.email}
                  </strong>
                </div>

              </div>


              <div className="quick-info-item">

                <span className="info-icon">
                  📱
                </span>

                <div>
                  <small>Phone Number</small>
                  <strong>
                    {profile.phone}
                  </strong>
                </div>

              </div>


              <div className="quick-info-item">

                <span className="info-icon">
                  🏫
                </span>

                <div>
                  <small>Department</small>
                  <strong>
                    {profile.department}
                  </strong>
                </div>

              </div>


              <div className="quick-info-item">

                <span className="info-icon">
                  📅
                </span>

                <div>
                  <small>Joined Year</small>
                  <strong>
                    {profile.joinedYear}
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* =================================
              ACADEMIC OVERVIEW
          ================================= */}

          <div className="profile-card academic-card">

            <div className="profile-card-title">

              <div>
                <h2>Academic Overview</h2>

                <p>
                  Your current academic performance
                </p>
              </div>

              <span className="card-icon">
                🎓
              </span>

            </div>


            <div className="academic-stats">

              <div className="academic-stat">

                <span>
                  Current CGPA
                </span>

                <strong>
                  {profile.cgpa}
                </strong>

              </div>


              <div className="academic-stat">

                <span>
                  Attendance
                </span>

                <strong>
                  86%
                </strong>

              </div>


              <div className="academic-stat">

                <span>
                  Semester
                </span>

                <strong>
                  {profile.semester}
                </strong>

              </div>

            </div>


            <div className="academic-progress">

              <div className="progress-header">

                <span>
                  Academic Progress
                </span>

                <strong>
                  72%
                </strong>

              </div>

              <div className="profile-progress">

                <div
                  className="profile-progress-fill"
                  style={{
                    width: "72%",
                  }}
                ></div>

              </div>

              <small>
                Keep going! You are making good progress.
              </small>

            </div>

          </div>

        </div>


        {/* =================================
            PERSONAL INFORMATION
        ================================= */}

        <div className="profile-card personal-info-card">

          <div className="profile-card-title">

            <div>
              <h2>Personal Information</h2>

              <p>
                Manage your personal and academic details
              </p>
            </div>

            <span className="card-icon">
              📋
            </span>

          </div>


          <div className="profile-form-grid">


            <div className="profile-form-group">

              <label>
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                Department
              </label>

              <input
                type="text"
                name="department"
                value={profile.department}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                Semester
              </label>

              <input
                type="text"
                name="semester"
                value={profile.semester}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                Division
              </label>

              <input
                type="text"
                name="division"
                value={profile.division}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>


            <div className="profile-form-group">

              <label>
                CGPA
              </label>

              <input
                type="text"
                name="cgpa"
                value={profile.cgpa}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>


        {/* =================================
            SKILLS
        ================================= */}

        <div className="profile-card skills-card">

          <div className="profile-card-title">

            <div>
              <h2>
                Skills & Interests
              </h2>

              <p>
                Showcase your technical skills
              </p>
            </div>

            <span className="card-icon">
              🚀
            </span>

          </div>


          <div className="skills-container">

            {skills.map((skill) => (

              <div
                className="skill-tag"
                key={skill}
              >

                <span>
                  {skill}
                </span>

                {isEditing && (

                  <button
                    onClick={() =>
                      removeSkill(skill)
                    }
                  >
                    ×
                  </button>

                )}

              </div>

            ))}

          </div>


          {isEditing && (

            <div className="add-skill">

              <input
                type="text"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) =>
                  setNewSkill(e.target.value)
                }
              />

              <button
                onClick={addSkill}
              >
                + Add Skill
              </button>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;