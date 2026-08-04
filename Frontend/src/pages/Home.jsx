import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Smart Campus</h1>

          <p>
            A smart and modern platform to manage campus activities,
            students, faculty, events, notices, and more.
          </p>

          <div className="hero-buttons">
            <button>Explore Campus</button>
            <button>Get Started</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Our Campus Services</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>📢 Notices</h3>
            <p>Get the latest college announcements and updates.</p>
          </div>

          <div className="feature-card">
            <h3>📅 Events</h3>
            <p>Discover and register for upcoming campus events.</p>
          </div>

          <div className="feature-card">
            <h3>📚 Study Materials</h3>
            <p>Access important study materials and resources.</p>
          </div>

          <div className="feature-card">
            <h3>💼 Placements</h3>
            <p>Explore job and internship opportunities.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;