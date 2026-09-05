import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";

const invalidCredentialsError = () => Object.assign(new Error("Invalid email or password"), { statusCode: 401 });

export const authenticateAdmin = async ({ email, password }) => {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail || !password) throw invalidCredentialsError();

  const user = await User.findOne({ email: normalizedEmail }).select("+password name email role isActive");
  const passwordMatches = user ? await user.matchPassword(password) : false;

  if (!user || !passwordMatches || !user.isActive || user.role !== "admin") {
    if (user?.role === "admin") await Admin.updateOne({ userId: user._id }, { $inc: { loginAttempts: 1 } });
    throw invalidCredentialsError();
  }

  const admin = await Admin.findOne({ userId: user._id });
  if (!admin || admin.status !== "active") throw invalidCredentialsError();

  await Admin.updateOne({ _id: admin._id }, { lastLogin: new Date(), loginAttempts: 0 });
  return {
    token: generateToken(user._id.toString(), "admin"),
    admin: { id: user._id, name: user.name, email: user.email, permissions: admin.permissions },
  };
};

export const getAuthenticatedAdmin = ({ user, admin }) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  permissions: admin.permissions,
});
