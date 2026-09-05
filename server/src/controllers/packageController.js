import * as packageResource from "../services/packageService.js";
import { createResourceController } from "./resourceController.js";
export const { list, getById, create, update, remove } = createResourceController(packageResource);
