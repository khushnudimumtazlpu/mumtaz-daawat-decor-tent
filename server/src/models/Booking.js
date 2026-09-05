import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: [true, "Booking ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    customerName: { type: String, required: [true, "Please provide your name"], trim: true, maxlength: 100 },
    customerEmail: { type: String, required: [true, "Please provide your email"], trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] },
    customerPhone: { type: String, required: [true, "Please provide your phone number"], trim: true, maxlength: 30 },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },
    galleryItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Gallery", default: null },
    bookingType: { type: String, enum: ["package", "service", "gallery"], default: "package", index: true },
    eventDate: {
      type: Date,
      required: [true, "Please provide event date"],
      validate: { validator: (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), message: "Event date must be in the future" },
    },
    guestCount: {
      type: Number,
      required: [true, "Please provide number of guests"],
      min: [1, "At least 1 guest is required"],
    },
    venue: {
      type: String,
      required: [true, "Please provide event venue"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide duration in hours"],
      min: [1, "Duration must be at least 1 hour"],
    },
    basePrice: {
      type: Number,
      required: [true, "Please provide base price"],
      min: [0, "Price cannot be negative"],
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Please provide total price"],
      min: [0, "Total price cannot be negative"],
    },
    advancePayment: {
      type: Number,
      default: 0,
      min: [0, "Advance payment cannot be negative"],
    },
    remainingPayment: {
      type: Number,
      required: [true, "Please calculate remaining payment"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },
    specialRequirements: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    cancelReason: {
      type: String,
      default: null,
    },
    paymentTransactionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ eventDate: 1 });
bookingSchema.index({ customerEmail: 1, createdAt: -1 });

export default mongoose.model("Booking", bookingSchema);
