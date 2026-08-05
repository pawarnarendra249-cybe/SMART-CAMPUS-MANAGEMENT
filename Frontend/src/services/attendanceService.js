import apiRequest from "./apiClient";

// ==========================================
// ATTENDANCE API CALLS
// ==========================================

// Student: get my own attendance (overall + subject-wise + raw records)
export function getMyAttendance() {
  return apiRequest("/attendance/my", { method: "GET" });
}

// Faculty/Admin: mark a student's attendance for a subject on a date
export function markAttendance({ studentId, subjectCode, subjectName, date, status }) {
  return apiRequest("/attendance/mark", {
    method: "POST",
    body: { studentId, subjectCode, subjectName, date, status },
  });
}

// Faculty/Admin: view a specific student's attendance
export function getStudentAttendance(studentId) {
  return apiRequest(`/attendance/student/${studentId}`, { method: "GET" });
}
