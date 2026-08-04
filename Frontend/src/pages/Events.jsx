import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const [events, setEvents] = useState([
    {
      id: 1,
      day: "15",
      month: "AUG",
      title: "Tech Fest 2026",
      category: "Technical",
      location: "Main Auditorium",
      date: "15 August 2026",
      description:
        "Join us for our annual technical festival featuring coding competitions, project exhibitions, workshops, and technology talks.",
      registered: false,
    },
    {
      id: 2,
      day: "20",
      month: "AUG",
      title: "Coding Competition",
      category: "Competition",
      location: "Computer Lab",
      date: "20 August 2026",
      description:
        "Test your programming skills and compete with talented students in an exciting coding competition.",
      registered: false,
    },
    {
      id: 3,
      day: "25",
      month: "AUG",
      title: "Career Guidance Seminar",
      category: "Career",
      location: "Seminar Hall",
      date: "25 August 2026",
      description:
        "Learn about career opportunities, interview preparation, and industry expectations from experienced professionals.",
      registered: false,
    },
    {
      id: 4,
      day: "05",
      month: "SEP",
      title: "Annual Sports Day",
      category: "Sports",
      location: "College Ground",
      date: "05 September 2026",
      description:
        "Participate in various indoor and outdoor sports activities and represent your department.",
      registered: false,
    },
  ]);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      event.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleRegister = (id) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              registered: !event.registered,
            }
          : event
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header">
          <h1>Campus Events</h1>

          <p>
            Discover upcoming events and activities happening on campus.
          </p>
        </div>


        {/* Search and Filter */}

        <div className="event-controls">

          <div className="event-search">
            🔍

            <input
              type="text"
              placeholder="Search events..."
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

            <option value="Technical">
              Technical
            </option>

            <option value="Competition">
              Competition
            </option>

            <option value="Career">
              Career
            </option>

            <option value="Sports">
              Sports
            </option>
          </select>

        </div>


        {/* Events */}

        <div className="events-grid">

          {filteredEvents.length > 0 ? (

            filteredEvents.map((event) => (

              <div
                className="event-card"
                key={event.id}
              >

                {/* Event Date */}

                <div className="event-card-date">

                  <strong>
                    {event.day}
                  </strong>

                  <span>
                    {event.month}
                  </span>

                </div>


                {/* Event Content */}

                <div className="event-card-content">

                  <div className="event-category">
                    {event.category}
                  </div>

                  <h2>
                    {event.title}
                  </h2>

                  <p>
                    {event.description}
                  </p>

                  <div className="event-details">

                    <span>
                      📅 {event.date}
                    </span>

                    <span>
                      📍 {event.location}
                    </span>

                  </div>


                  {/* Register Button */}

                  <button
                    className={
                      event.registered
                        ? "registered-btn"
                        : "register-btn"
                    }
                    onClick={() =>
                      handleRegister(event.id)
                    }
                  >
                    {event.registered
                      ? "✓ Registered"
                      : "Register Now"}
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="no-events">

              <h2>
                No Events Found
              </h2>

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

export default Events;