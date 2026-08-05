import apiRequest from "./apiClient";

// ==========================================
// STUDENT PROFILE API CALLS
// ==========================================

export function getMyProfile() {
  return apiRequest("/students/profile", { method: "GET" });
}

export function createMyProfile(profileData) {
  return apiRequest("/students/profile", {
    method: "POST",
    body: profileData,
  });
}

export function updateMyProfile(profileData) {
  return apiRequest("/students/profile", {
    method: "PUT",
    body: profileData,
  });
}

export function deleteMyProfile() {
  return apiRequest("/students/profile", {
    method: "DELETE",
  });
}

// Faculty/Admin only — used to populate student pickers (e.g. mark attendance)
export function getAllStudents() {
  return apiRequest("/students/all", { method: "GET" });
}
