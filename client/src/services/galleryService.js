import { apiRequest } from "./apiClient";
export const getGallery = async () => (await apiRequest("/gallery?limit=100&sortBy=createdAt&sortOrder=desc")).data.items;
export const uploadGalleryImage = async (file) => { const data = new FormData(); data.append("image", file); return (await apiRequest("/uploads/images", { method: "POST", body: data, headers: {} })).data.image; };
export const uploadGalleryImages = async (files) => Promise.all(files.map(uploadGalleryImage));
export const createGalleryItem = async (payload) => (await apiRequest("/gallery", { method: "POST", body: JSON.stringify(payload) })).data.item;
export const deleteGalleryItem = async (id) => apiRequest(`/gallery/${id}`, { method: "DELETE" });
