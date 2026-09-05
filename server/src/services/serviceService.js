import Service from "../models/Service.js";
import Package from "../models/Package.js";
import { deleteResource, findResource, listResources, updateResource } from "./resourceService.js";
export const list = (query) => listResources(Service, query, { baseFilter: { isActive: true }, searchFields: ["name", "description", "customCategory"], filterFields: { category: "string", availability: "boolean" }, sortFields: ["createdAt", "name", "price", "maxGuests"] });
export const getById = (id) => findResource(Service, id, { filter: { isActive: true } });
export const create = (payload) => Service.create(payload);
export const update = (id, payload) => updateResource(Service, id, payload);
export const remove = async (id) => { const packageCount = await Package.countDocuments({ serviceId: id }); if (packageCount) throw Object.assign(new Error("Cannot delete a service with linked packages"), { statusCode: 409 }); await deleteResource(Service, id); };
