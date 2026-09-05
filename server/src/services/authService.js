import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";

const invalidCredentialsError = () => Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role });

export const registerCustomer = async ({ name, email, phone, password }) => {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!name?.trim() || !normalizedEmail || !phone?.trim() || !password) {
    throw Object.assign(new Error("Name, email, phone number, and password are required"), { statusCode: 400 });
  }
  if (password.length < 8) throw Object.assign(new Error("Password must contain at least 8 characters"), { statusCode: 400 });

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw Object.assign(new Error("An account with this email already exists"), { statusCode: 409 });

  const user = await User.create({ name: name.trim(), email: normalizedEmail, phone: phone.trim(), password, role: "user" });
  return { token: generateToken(user._id.toString(), "user"), user: publicUser(user) };
};

export const authenticateCustomer = async ({ email, password }) => {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail || !password) throw invalidCredentialsError();

  const user = await User.findOne({ email: normalizedEmail }).select("+password name email phone role isActive");
  const passwordMatches = user ? await user.matchPassword(password) : false;
  if (!user || !passwordMatches || !user.isActive || user.role !== "user") throw invalidCredentialsError();

  return { token: generateToken(user._id.toString(), "user"), user: publicUser(user) };
};

export const getAuthenticatedUser = async (userId) => {
  const user = await User.findById(userId).select("name email phone role isActive");
  if (!user || !user.isActive) throw Object.assign(new Error("Your account is unavailable"), { statusCode: 401 });
  return publicUser(user);
};

export const updateCustomerProfile = async (userId, { name, phone }) => {
  if (!name?.trim() || !phone?.trim()) throw Object.assign(new Error("Name and phone number are required"), { statusCode: 400 });
  const user = await User.findOneAndUpdate({ _id: userId, role: "user", isActive: true }, { name: name.trim(), phone: phone.trim() }, { new: true, runValidators: true });
  if (!user) throw Object.assign(new Error("Your account is unavailable"), { statusCode: 401 });
  return publicUser(user);
};
