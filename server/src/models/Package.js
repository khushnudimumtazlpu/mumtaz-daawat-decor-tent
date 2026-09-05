import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a package name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a package description"],
    },
    eyebrow: { type: String, default: null, trim: true, maxlength: 120 },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Package must be linked to a service"],
    },
    tier: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: [true, "Please specify package tier"],
    },
    price: {
      type: Number,
      required: [true, "Please provide package price"],
      min: [0, "Price cannot be negative"],
    },
    priceType: { type: String, enum: ["fixed", "custom"], default: "fixed" },
    discountedPrice: {
      type: Number,
      default: null,
      min: [0, "Discounted price cannot be negative"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide duration in hours"],
      min: [1, "Duration must be at least 1 hour"],
    },
    maxGuests: {
      type: Number,
      required: [true, "Please provide maximum guests"],
      min: [1, "Must allow at least 1 guest"],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: null,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    featured: { type: Boolean, default: false },
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
packageSchema.index({ serviceId: 1 });
packageSchema.index({ tier: 1 });
packageSchema.index({ isActive: 1 });
packageSchema.index({ createdAt: -1 });

export default mongoose.model("Package", packageSchema);
