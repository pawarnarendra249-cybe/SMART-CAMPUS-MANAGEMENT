// ==========================================
// API BASE CONFIGURATION
// ==========================================
// Change this if backend runs on a different host/port,
// or set VITE_API_BASE_URL in a .env file at the Frontend root.

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
