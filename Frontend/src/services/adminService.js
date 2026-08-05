import apiRequest from "./apiClient";

// ==========================================
// ADMIN API CALLS (Admin only)
// ==========================================

export function getAdminStats() {
  return apiRequest("/admin/stats", { method: "GET" });
}

// -- User management --

export function getAllUsers() {
  return apiRequest("/admin/users", { method: "GET" });
}

export function updateUserRole(userId, role) {
  return apiRequest(`/admin/users/${userId}/role`, {
    method: "PUT",
    body: { role },
  });
}

export function deleteUser(userId) {
  return apiRequest(`/admin/users/${userId}`, { method: "DELETE" });
}

// -- Content moderation --

export function deleteNotice(id) {
  return apiRequest(`/admin/notices/${id}`, { method: "DELETE" });
}

export function deleteEvent(id) {
  return apiRequest(`/admin/events/${id}`, { method: "DELETE" });
}

export function deleteMaterial(id) {
  return apiRequest(`/admin/materials/${id}`, { method: "DELETE" });
}

export function deleteTimetableEntry(id) {
  return apiRequest(`/admin/timetable/${id}`, { method: "DELETE" });
}

export function deletePlacement(id) {
  return apiRequest(`/admin/placements/${id}`, { method: "DELETE" });
}

export function deleteComplaint(id) {
  return apiRequest(`/admin/complaints/${id}`, { method: "DELETE" });
}
