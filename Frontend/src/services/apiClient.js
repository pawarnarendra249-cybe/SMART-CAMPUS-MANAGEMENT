import { API_BASE_URL } from "./apiConfig";
import { getToken } from "../utils/auth";

// ==========================================
// CORE API CLIENT
// ==========================================
// Wraps fetch() so every request automatically:
//  - points to the backend base URL
//  - sends JSON
//  - attaches the JWT token (if the user is logged in)
//  - throws a readable error using backend's { message } field

async function apiRequest(endpoint, { method = "GET", body, auth = true } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Some responses (e.g. 204) may not have a JSON body
  }

  if (!response.ok) {
    const message =
      (data && data.message) || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default apiRequest;
