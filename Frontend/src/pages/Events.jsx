import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getAllEvents, toggleEventRegistration } from "../services/eventService";

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllEvents();
      setEvents(data.events);
    } catch (err) {
      setError(err.message || "Could not load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleRegister = async (id) => {
    // Optimistic UI update
    setEvents((current) =>
      current.map((event) =>
        event._id === id ? { ...event, registered: !event.registered } : event
      )
    );

    try {
      await toggleEventRegistration(id);
    } catch (err) {
      setError(err.message || "Could not update registration");
      loadEvents(); // revert to real state on failure
    }
  };

  const dateParts = (dateStr) => {
    const d = new Date(dateStr);
    return {
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
      full: d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        {/* Page Header */}

        <div className="page-header">
          <h1>Campus Events</h1>
          <p>Discover upcoming events and activities happening on campus.</p>
        </div>

        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Search and Filter */}

        <div className="event-controls">
          <div className="event-search">
            🔍
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Competition">Competition</option>
            <option value="Career">Career</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Events */}

        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const { day, month, full } = dateParts(event.date);

                return (
                  <div className="event-card" key={event._id}>
                    <div className="event-card-date">
                      <strong>{day}</strong>
                      <span>{month}</span>
                    </div>

                    <div className="event-card-content">
                      <div className="event-category">{event.category}</div>
                      <h2>{event.title}</h2>
                      <p>{event.description}</p>

                      <div className="event-details">
                        <span>📅 {full}</span>
                        <span>📍 {event.location}</span>
                      </div>

                      <button
                        className={event.registered ? "registered-btn" : "register-btn"}
                        onClick={() => handleRegister(event._id)}
                      >
                        {event.registered ? "✓ Registered" : "Register Now"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-events">
                <h2>No Events Found</h2>
                <p>Try changing your search or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Events;
