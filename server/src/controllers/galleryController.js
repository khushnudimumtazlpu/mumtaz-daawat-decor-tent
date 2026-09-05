import * as galleryResource from "../services/galleryService.js";
import { createResourceController } from "./resourceController.js";
export const { list, getById, create, update, remove } = createResourceController(galleryResource);
