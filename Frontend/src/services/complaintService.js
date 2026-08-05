import apiRequest from "./apiClient";

export function submitComplaint(data) {
  return apiRequest("/complaints", { method: "POST", body: data });
}

export function getMyComplaints() {
  return apiRequest("/complaints/my", { method: "GET" });
}

export function getAllComplaints() {
  return apiRequest("/complaints", { method: "GET" });
}

export function updateComplaintStatus(id, status) {
  return apiRequest(`/complaints/${id}/status`, {
    method: "PUT",
    body: { status },
  });
}
