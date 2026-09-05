import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/database.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

dotenv.config();

const requiredEnvironment = ["ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PHONE", "ADMIN_PASSWORD"];
const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);
if (missingEnvironment.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvironment.join(", ")}`);
  process.exit(1);
}

if (process.env.ADMIN_PASSWORD.length < 12) {
  console.error("ADMIN_PASSWORD must be at least 12 characters long");
  process.exit(1);
}

const createAdmin = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
  let user = await User.findOne({ email }).select("+password");
  const existingAdministrators = await Admin.find().select("userId");

  if (existingAdministrators.length > 0 && (!user || existingAdministrators.some((admin) => admin.userId.toString() !== user._id.toString()))) {
    throw new Error("An administrator account already exists. This application supports one administrator only.");
  }

  if (user) {
    user.name = process.env.ADMIN_NAME.trim();
    user.phone = process.env.ADMIN_PHONE.trim();
    user.password = process.env.ADMIN_PASSWORD;
    user.role = "admin";
    user.isActive = true;
    await user.save();
  } else {
    user = await User.create({
      name: process.env.ADMIN_NAME.trim(),
      email,
      phone: process.env.ADMIN_PHONE.trim(),
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
  }

  await Admin.findOneAndUpdate(
    { userId: user._id },
    { $set: { status: "active", loginAttempts: 0 }, $setOnInsert: { userId: user._id } },
    { upsert: true, returnDocument: "after", runValidators: true }
  );

  console.log(`Administrator account is ready for ${email}`);
  await mongoose.disconnect();
};

createAdmin().catch(async (error) => {
  console.error(`Unable to create administrator: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
