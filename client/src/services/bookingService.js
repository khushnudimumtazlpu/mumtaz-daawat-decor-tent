import { apiRequest } from "./apiClient";

export const getServices = async () => (await apiRequest("/services?limit=100&sortBy=name&sortOrder=asc")).data.items;
export const getPackages = async (serviceId) => (await apiRequest(`/packages?limit=100&serviceId=${encodeURIComponent(serviceId)}&sortBy=price&sortOrder=asc`)).data.items;
export const createBooking = async (payload) => (await apiRequest("/bookings", { method: "POST", body: JSON.stringify(payload) })).data;
export const getAdminBookings = async (query = "page=1&limit=30&sortBy=eventDate&sortOrder=asc") => (await apiRequest(`/bookings?${query}`)).data;
export const updateBooking = async (id, payload) => (await apiRequest(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify(payload) })).data.item;
export const getMyBookings = async () => (await apiRequest("/bookings/mine")).data.items;
export const deleteMyBooking = async (id) => apiRequest(`/bookings/mine/${id}`, { method: "DELETE" });
export const deleteBooking = async (id) => apiRequest(`/bookings/${id}`, { method: "DELETE" });
export const completeDemoPayment = async (id) => (await apiRequest(`/bookings/mine/${id}/demo-payment`, { method: "POST" })).data.item;
