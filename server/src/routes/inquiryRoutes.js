import express from "express";
import rateLimit from "express-rate-limit";
import * as controller from "../controllers/inquiryController.js";
import { optionalCustomerToken, requireActiveAdmin, verifyCustomerToken, verifyToken } from "../middleware/auth.js";
import { validateBody, validateObjectId } from "../middleware/validateRequest.js";

const router = express.Router();
const publicFields = ["name", "email", "phone", "message"];
const replyFields = ["message"];
const inquiryLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false, message: { success: false, message: "Too many enquiries. Please try again later." } });

router.post("/", inquiryLimiter, optionalCustomerToken, validateBody({ allowedFields: publicFields, requiredFields: ["name", "email", "message"] }), controller.create);
router.get("/mine", verifyCustomerToken, controller.listMine);
router.delete("/mine/:id", verifyCustomerToken, validateObjectId(), controller.removeMine);
router.get("/", verifyToken, requireActiveAdmin, controller.list);
router.post("/:id/reply", verifyToken, requireActiveAdmin, validateObjectId(), validateBody({ allowedFields: replyFields, requiredFields: ["message"] }), controller.reply);
router.delete("/:id", verifyToken, requireActiveAdmin, validateObjectId(), controller.remove);

export default router;
