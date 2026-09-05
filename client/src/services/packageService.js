import { apiRequest } from "./apiClient";

export const getPublicPackages = async () => (await apiRequest("/packages?limit=100&sortBy=price&sortOrder=asc")).data.items;
export const createPackage = async (payload) => (await apiRequest("/packages", { method: "POST", body: JSON.stringify(payload) })).data.item;
export const deletePackage = async (id) => apiRequest(`/packages/${id}`, { method: "DELETE" });
