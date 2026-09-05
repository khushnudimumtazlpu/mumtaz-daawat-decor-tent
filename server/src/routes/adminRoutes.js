import express from "express";
import rateLimit from "express-rate-limit";
import { login, logout, overview, verifySession } from "../controllers/adminController.js";
import { requireActiveAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again in 15 minutes." },
});

router.post("/auth/login", loginLimiter, login);
router.post("/auth/logout", logout);
router.get("/auth/verify", verifyToken, requireActiveAdmin, verifySession);
router.get("/overview", verifyToken, requireActiveAdmin, overview);

export default router;
