import apiRequest from "./apiClient";

export function getAllMaterials() {
  return apiRequest("/materials", { method: "GET" });
}

export function createMaterial(data) {
  return apiRequest("/materials", { method: "POST", body: data });
}
