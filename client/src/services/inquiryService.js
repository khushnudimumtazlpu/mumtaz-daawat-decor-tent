import { apiRequest } from "./apiClient";

export const createInquiry = async (payload) => (await apiRequest("/inquiries", { method: "POST", body: JSON.stringify(payload) })).data.item;
export const getAdminInquiries = async (query = "page=1&limit=50&sortBy=createdAt&sortOrder=desc") => (await apiRequest(`/inquiries?${query}`)).data;
export const replyToInquiry = async (id, message) => (await apiRequest(`/inquiries/${id}/reply`, { method: "POST", body: JSON.stringify({ message }) })).data;
export const deleteInquiry = async (id) => apiRequest(`/inquiries/${id}`, { method: "DELETE" });
export const getMyInquiries = async () => (await apiRequest("/inquiries/mine")).data.items;
export const deleteMyInquiry = async (id) => apiRequest(`/inquiries/mine/${id}`, { method: "DELETE" });
