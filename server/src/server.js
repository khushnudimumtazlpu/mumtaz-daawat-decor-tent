import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { configureCloudinary } from "./config/cloudinary.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/health.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

// Load environment variables
dotenv.config();
configureCloudinary();

// Initialize Express app
const app = express();
app.set("trust proxy", 1);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Browsers automatically request this path when the API is opened directly.
// The frontend owns the branded favicon, so the API can safely return no content.
app.get("/favicon.ico", (_req, res) => res.status(204).end());

// A lightweight root response for hosting-provider checks and direct visits.
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Mumtaz Daawat Decor API is running",
    health: "/api/health",
  });
});

// Routes
app.use("/api", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/inquiries", inquiryRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start listening only after MongoDB is available. This prevents the API from
// appearing healthy while its database connection has failed.
const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  await connectDB();

  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

startServer().catch((error) => {
  console.error("❌ Server startup stopped because MongoDB is unavailable.");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled rejection: ${err.message}`);
  server?.close(() => process.exit(1));
});

export default app;
