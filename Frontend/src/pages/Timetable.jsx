import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timetable = {
    Monday: [
      {
        time: "09:00 - 10:00",
        subject: "Database Management System",
        code: "DBMS",
        faculty: "Prof. Sharma",
        room: "Room 201",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Operating System",
        code: "OS",
        faculty: "Prof. Patil",
        room: "Room 202",
        type: "Lecture",
      },
      {
        time: "11:00 - 11:30",
        subject: "Break",
        code: "",
        faculty: "",
        room: "",
        type: "Break",
      },
      {
        time: "11:30 - 12:30",
        subject: "Theory of Computation",
        code: "TOC",
        faculty: "Prof. Deshmukh",
        room: "Room 203",
        type: "Lecture",
      },
      {
        time: "01:30 - 03:30",
        subject: "DBMS Practical",
        code: "DBMS LAB",
        faculty: "Prof. Sharma",
        room: "Computer Lab 1",
        type: "Practical",
      },
    ],

    Tuesday: [
      {
        time: "09:00 - 10:00",
        subject: "Computer Networks",
        code: "CN",
        faculty: "Prof. Joshi",
        room: "Room 204",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Engineering Mathematics",
        code: "M4",
        faculty: "Prof. Kulkarni",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "11:00 - 11:30",
        subject: "Break",
        code: "",
        faculty: "",
        room: "",
        type: "Break",
      },
      {
        time: "11:30 - 01:30",
        subject: "Operating System Practical",
        code: "OS LAB",
        faculty: "Prof. Patil",
        room: "Computer Lab 2",
        type: "Practical",
      },
    ],

    Wednesday: [
      {
        time: "09:00 - 10:00",
        subject: "Theory of Computation",
        code: "TOC",
        faculty: "Prof. Deshmukh",
        room: "Room 203",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Database Management System",
        code: "DBMS",
        faculty: "Prof. Sharma",
        room: "Room 201",
        type: "Lecture",
      },
      {
        time: "11:00 - 11:30",
        subject: "Break",
        code: "",
        faculty: "",
        room: "",
        type: "Break",
      },
      {
        time: "11:30 - 12:30",
        subject: "Computer Networks",
        code: "CN",
        faculty: "Prof. Joshi",
        room: "Room 204",
        type: "Lecture",
      },
    ],

    Thursday: [
      {
        time: "09:00 - 10:00",
        subject: "Operating System",
        code: "OS",
        faculty: "Prof. Patil",
        room: "Room 202",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Engineering Mathematics",
        code: "M4",
        faculty: "Prof. Kulkarni",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "11:00 - 11:30",
        subject: "Break",
        code: "",
        faculty: "",
        room: "",
        type: "Break",
      },
      {
        time: "11:30 - 01:30",
        subject: "Computer Networks Practical",
        code: "CN LAB",
        faculty: "Prof. Joshi",
        room: "Computer Lab 1",
        type: "Practical",
      },
    ],

    Friday: [
      {
        time: "09:00 - 10:00",
        subject: "Database Management System",
        code: "DBMS",
        faculty: "Prof. Sharma",
        room: "Room 201",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Theory of Computation",
        code: "TOC",
        faculty: "Prof. Deshmukh",
        room: "Room 203",
        type: "Lecture",
      },
      {
        time: "11:00 - 11:30",
        subject: "Break",
        code: "",
        faculty: "",
        room: "",
        type: "Break",
      },
      {
        time: "11:30 - 12:30",
        subject: "Operating System",
        code: "OS",
        faculty: "Prof. Patil",
        room: "Room 202",
        type: "Lecture",
      },
    ],

    Saturday: [
      {
        time: "09:00 - 10:00",
        subject: "Engineering Mathematics",
        code: "M4",
        faculty: "Prof. Kulkarni",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Computer Networks",
        code: "CN",
        faculty: "Prof. Joshi",
        room: "Room 204",
        type: "Lecture",
      },
      {
        time: "11:00 - 11:30",
        subject: "Break",
        code: "",
        faculty: "",
        room: "",
        type: "Break",
      },
      {
        time: "11:30 - 01:30",
        subject: "Project Work",
        code: "PROJECT",
        faculty: "Project Guide",
        room: "Project Lab",
        type: "Practical",
      },
    ],
  };

  const selectedSchedule = timetable[selectedDay];

  return (
    <DashboardLayout>
      <div className="page-container">

        {/* Page Header */}

        <div className="page-header">
          <h1>Class Timetable</h1>

          <p>
            View your weekly class schedule and plan your day.
          </p>
        </div>


        {/* Day Selector */}

        <div className="day-selector">

          {days.map((day) => (
            <button
              key={day}
              className={
                selectedDay === day
                  ? "day-btn active"
                  : "day-btn"
              }
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}

        </div>


        {/* Selected Day */}

        <div className="selected-day-header">
          <div>
            <h2>{selectedDay}</h2>

            <p>
              {selectedSchedule.length} classes scheduled
            </p>
          </div>

          <span className="today-badge">
            Weekly Schedule
          </span>
        </div>


        {/* Timetable */}

        <div className="timetable">

          {selectedSchedule.map((item, index) => (

            <div
              className={
                item.type === "Break"
                  ? "timetable-row break-row"
                  : "timetable-row"
              }
              key={index}
            >

              {/* Time */}

              <div className="timetable-time">
                <strong>
                  {item.time}
                </strong>
              </div>


              {/* Class */}

              {item.type === "Break" ? (

                <div className="break-content">
                  ☕ Break Time
                </div>

              ) : (

                <div className="class-content">

                  <div className="class-main">

                    <div className="class-icon">
                      {item.type === "Practical"
                        ? "💻"
                        : "📚"}
                    </div>

                    <div>
                      <span className="class-type">
                        {item.type}
                      </span>

                      <h3>
                        {item.subject}
                      </h3>

                      <span className="class-code">
                        {item.code}
                      </span>
                    </div>

                  </div>


                  <div className="class-details">

                    <span>
                      👨‍🏫 {item.faculty}
                    </span>

                    <span>
                      🚪 {item.room}
                    </span>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Timetable;