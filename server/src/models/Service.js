import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a service name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a service description"],
    },
    category: {
      type: String,
      required: [true, "Please provide a service category"],
      enum: ["wedding", "corporate", "festival", "adventure", "other"],
    },
    customCategory: {
      type: String,
      default: null,
      trim: true,
      maxlength: 60,
    },
    icon: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      required: [true, "Please provide a service image"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a base price"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide duration in hours"],
      min: [1, "Duration must be at least 1 hour"],
    },
    maxGuests: {
      type: Number,
      required: [true, "Please provide maximum number of guests"],
      min: [1, "Must allow at least 1 guest"],
    },
    features: {
      type: [String],
      default: [],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ createdAt: -1 });

export default mongoose.model("Service", serviceSchema);
