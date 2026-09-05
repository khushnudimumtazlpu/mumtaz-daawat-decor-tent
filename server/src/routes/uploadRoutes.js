import express from "express";
import { remove, upload } from "../controllers/uploadController.js";
import { requireActiveAdmin, verifyToken } from "../middleware/auth.js";
import { imageUpload } from "../middleware/upload.js";
const router = express.Router();
const uploadHandler = (req, res, next) => imageUpload(req, res, (error) => { if (error) return res.status(400).json({ success: false, message: error.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller" : "Only JPEG, PNG, WebP, and AVIF images are allowed" }); next(); });
router.post("/images", verifyToken, requireActiveAdmin, uploadHandler, upload);
router.delete("/images", verifyToken, requireActiveAdmin, remove);
export default router;
