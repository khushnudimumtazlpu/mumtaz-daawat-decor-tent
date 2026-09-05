import { authenticateAdmin, getAuthenticatedAdmin } from "../services/adminService.js";
import { getAuthCookieOptions, getClearedAuthCookieOptions } from "../utils/authCookie.js";
import { getOverview } from "../services/dashboardService.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    const { token, admin } = await authenticateAdmin({ email, password });
    res.cookie("adminAuthToken", token, getAuthCookieOptions());
    res.status(200).json({ success: true, message: "Login successful", data: { admin } });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("adminAuthToken", getClearedAuthCookieOptions());
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const verifySession = (req, res) => {
  res.status(200).json({ success: true, data: { admin: getAuthenticatedAdmin(req.authenticatedAdmin) } });
};
export const overview = async (req, res, next) => { try { res.json({ success: true, data: await getOverview() }); } catch (error) { next(error); } };
