import * as serviceResource from "../services/serviceService.js";
import { createResourceController } from "./resourceController.js";
export const { list, getById, create, update, remove } = createResourceController(serviceResource);
