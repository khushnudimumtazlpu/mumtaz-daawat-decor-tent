import Gallery from "../models/Gallery.js";
import { deleteImage } from "./imageService.js";
import { deleteResource, findResource, listResources, updateResource } from "./resourceService.js";
export const list = (query) => listResources(Gallery, query, { baseFilter: { isActive: true }, searchFields: ["title", "description", "customCategory"], filterFields: { category: "string", featured: "boolean" }, sortFields: ["createdAt", "title", "startingPrice"] });
export const getById = (id) => findResource(Gallery, id, { filter: { isActive: true } });
export const create = (payload) => Gallery.create(payload);
export const update = (id, payload) => updateResource(Gallery, id, payload);
export const remove = async (id) => { const gallery = await Gallery.findById(id); if (!gallery) { const error = new Error("Resource not found"); error.statusCode = 404; throw error; } await Promise.all((gallery.images || []).map((image) => deleteImage(image.publicId))); await deleteResource(Gallery, id); };
