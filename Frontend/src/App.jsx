import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudentDashboard from "./pages/StudentDashboard";
import Notices from "./pages/Notices";
import Events from "./pages/Events";
import StudyMaterials from "./pages/StudyMaterials";
import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import Placements from "./pages/Placements";
import Complaints from "./pages/Complaints";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
  path="/student-dashboard"
  element={<StudentDashboard />}
/>
<Route path="/notices" element={<Notices />} />
<Route path="/events" element={<Events />} />
<Route
  path="/study-materials"
  element={<StudyMaterials />}
/>
<Route
  path="/attendance"
  element={<Attendance />}
/>
<Route
  path="/timetable"
  element={<Timetable />}
/>
<Route
  path="/placements"
  element={<Placements />}
/>
<Route
  path="/complaints"
  element={<Complaints />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;