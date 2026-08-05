import apiRequest from "./apiClient";

export function getTimetable() {
  return apiRequest("/timetable", { method: "GET" });
}

export function createTimetableEntry(data) {
  return apiRequest("/timetable", { method: "POST", body: data });
}
