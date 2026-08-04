import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">
        <div className="about-content">
          <h1>About Smart Campus</h1>

          <p>
            Smart Campus Management System is a digital platform designed
            to make campus services simple, connected, and accessible.
          </p>

          <p>
            Students, faculty, and administrators can use the platform
            to access important campus information, events, notices,
            academic resources, and other services.
          </p>

          <div className="about-features">
            <div>
              <h3>🎓 For Students</h3>
              <p>
                Access notices, events, study materials, placements,
                and campus services.
              </p>
            </div>

            <div>
              <h3>👨‍🏫 For Faculty</h3>
              <p>
                Manage academic resources, notices, events, and
                student-related activities.
              </p>
            </div>

            <div>
              <h3>🛠️ For Admin</h3>
              <p>
                Manage students, faculty, campus activities, and
                system information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;