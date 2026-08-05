import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../utils/auth";

// ==========================================
// ROLE-GATED ROUTE
// ==========================================
// Like ProtectedRoute, but also checks the logged-in user's role.
// Usage: <Route path="/faculty-dashboard" element={
//          <RoleRoute allowedRoles={["faculty", "admin"]}>
//            <FacultyDashboard />
//          </RoleRoute>
//        } />

function RoleRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const user = getUser();

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Logged in, but wrong role for this page — send them to their own dashboard
    return <Navigate to="/student-dashboard" replace />;
  }

  return children;
}

export default RoleRoute;
