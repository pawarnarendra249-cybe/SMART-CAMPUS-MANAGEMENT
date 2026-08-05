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
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes - require login */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-materials"
          element={
            <ProtectedRoute>
              <StudyMaterials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placements"
          element={
            <ProtectedRoute>
              <Placements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            <RoleRoute allowedRoles={["faculty", "admin"]}>
              <FacultyDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </RoleRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
