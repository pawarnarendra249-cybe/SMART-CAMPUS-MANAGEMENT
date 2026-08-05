import apiRequest from "./apiClient";

export function getAllPlacements() {
  return apiRequest("/placements", { method: "GET" });
}

export function createPlacement(data) {
  return apiRequest("/placements", { method: "POST", body: data });
}

export function toggleApplication(jobId) {
  return apiRequest(`/placements/${jobId}/apply`, { method: "POST" });
}
