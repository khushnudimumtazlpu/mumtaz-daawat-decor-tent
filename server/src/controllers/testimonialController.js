import * as testimonialResource from "../services/testimonialService.js";
import { createResourceController } from "./resourceController.js";
export const { list, getById, create, update, remove } = createResourceController(testimonialResource);
