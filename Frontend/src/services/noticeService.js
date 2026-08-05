import apiRequest from "./apiClient";

export function getAllNotices() {
  return apiRequest("/notices", { method: "GET" });
}

export function createNotice(data) {
  return apiRequest("/notices", { method: "POST", body: data });
}
