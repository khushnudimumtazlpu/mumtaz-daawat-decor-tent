import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Admin must be linked to a user"],
      unique: true,
    },
    permissions: {
      type: [String],
      enum: ["manage_users", "manage_services", "manage_bookings", "manage_gallery", "view_analytics"],
      default: ["manage_users", "manage_services", "manage_bookings", "manage_gallery"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// `unique: true` on userId already creates its index.
adminSchema.index({ status: 1 });
adminSchema.index({ createdAt: -1 });

export default mongoose.model("Admin", adminSchema);
