import express from "express";
import rateLimit from "express-rate-limit";
import { login, logout, register, updateProfile, verifySession } from "../controllers/authController.js";
import { verifyCustomerToken } from "../middleware/auth.js";

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Please try again in 15 minutes." },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/verify", verifyCustomerToken, verifySession);
router.patch("/profile", verifyCustomerToken, updateProfile);

export default router;
