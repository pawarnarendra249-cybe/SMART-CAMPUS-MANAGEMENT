import apiRequest from "./apiClient";

export function getAllEvents() {
  return apiRequest("/events", { method: "GET" });
}

export function createEvent(data) {
  return apiRequest("/events", { method: "POST", body: data });
}

export function toggleEventRegistration(eventId) {
  return apiRequest(`/events/${eventId}/register`, { method: "POST" });
}
