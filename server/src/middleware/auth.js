import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const getTokenFromRequest = (req, cookieName = "adminAuthToken") => {
  const authorization = req.headers.authorization;
  if (authorization?.startsWith("Bearer ")) return authorization.slice(7);

  return req.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`))
    ?.slice(`${cookieName}=`.length);
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be configured");
  return process.env.JWT_SECRET;
};

export const verifyToken = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication is required",
    });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Your session is invalid or has expired",
    });
  }
};
export const verifyCustomerToken = (req, res, next) => {
  const customerToken = getTokenFromRequest(req, "customerAuthToken");
  if (!customerToken) return res.status(401).json({ success: false, message: "Authentication is required" });
  try { req.user = jwt.verify(customerToken, getJwtSecret()); next(); } catch { return res.status(401).json({ success: false, message: "Your session is invalid or has expired" }); }
};

export const optionalCustomerToken = (req, res, next) => {
  const token = getTokenFromRequest(req, "customerAuthToken");
  if (!token) return next();
  try { req.user = jwt.verify(token, getJwtSecret()); } catch { /* Anonymous submission remains allowed. */ }
  next();
};

export const generateToken = (userId, role = "user") => {
  return jwt.sign(
    { userId, role },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

export const requireActiveAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Administrator access is required" });
    }

    const [user, admin] = await Promise.all([
      User.findById(req.user.userId).select("name email role isActive"),
      Admin.findOne({ userId: req.user.userId }).select("permissions status"),
    ]);

    if (!user || !user.isActive || user.role !== "admin" || !admin || admin.status !== "active") {
      return res.status(403).json({ success: false, message: "Your administrator access is unavailable" });
    }

    req.authenticatedAdmin = { user, admin };
    next();
  } catch (error) {
    next(error);
  }
};
