import { apiRequest } from "./apiClient";
export const getPublicServices = async () => (await apiRequest("/services?limit=100&sortBy=name&sortOrder=asc")).data.items;
export const createService = async (payload) => (await apiRequest("/services", { method: "POST", body: JSON.stringify(payload) })).data.item;
export const updateService = async (id, payload) => (await apiRequest(`/services/${id}`, { method: "PUT", body: JSON.stringify(payload) })).data.item;
export const deleteService = async (id) => apiRequest(`/services/${id}`, { method: "DELETE" });
