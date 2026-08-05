import apiRequest from "./apiClient";

// ==========================================
// AUTH API CALLS
// ==========================================

export function registerUser({ name, email, password, role }) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: { name, email, password, role },
    auth: false,
  });
}

export function loginUser({ email, password }) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
}
