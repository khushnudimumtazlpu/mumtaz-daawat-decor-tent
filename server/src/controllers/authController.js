import { authenticateCustomer, getAuthenticatedUser, registerCustomer, updateCustomerProfile } from "../services/authService.js";
import { getAuthCookieOptions, getClearedAuthCookieOptions } from "../utils/authCookie.js";

export const register = async (req, res, next) => {
  try {
    const { token, user } = await registerCustomer(req.body ?? {});
    res.cookie("customerAuthToken", token, getAuthCookieOptions());
    res.status(201).json({ success: true, message: "Account created successfully", data: { user } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await authenticateCustomer(req.body ?? {});
    res.cookie("customerAuthToken", token, getAuthCookieOptions());
    res.status(200).json({ success: true, message: "Login successful", data: { user } });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("customerAuthToken", getClearedAuthCookieOptions());
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const verifySession = async (req, res, next) => {
  try {
    const user = await getAuthenticatedUser(req.user.userId);
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try { const user = await updateCustomerProfile(req.user.userId, req.body ?? {}); res.json({ success: true, message: "Profile updated", data: { user } }); } catch (error) { next(error); }
};
