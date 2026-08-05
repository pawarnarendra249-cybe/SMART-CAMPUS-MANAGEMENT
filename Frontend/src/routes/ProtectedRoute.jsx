import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// ==========================================
// PROTECTED ROUTE
// ==========================================
// Wrap any page that should only be visible to logged-in users.
// Usage: <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
