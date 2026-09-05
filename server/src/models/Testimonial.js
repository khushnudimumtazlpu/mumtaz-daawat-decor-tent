import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Testimonial must be from a user"],
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Testimonial must be linked to a service"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    title: {
      type: String,
      required: [true, "Please provide a testimonial title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide testimonial content"],
      minlength: [10, "Testimonial must be at least 10 characters"],
      maxlength: [1000, "Testimonial cannot exceed 1000 characters"],
    },
    authorName: {
      type: String,
      required: [true, "Please provide author name"],
      trim: true,
    },
    authorImage: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Please provide author email"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
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
testimonialSchema.index({ serviceId: 1 });
testimonialSchema.index({ rating: 1 });
testimonialSchema.index({ featured: 1 });
testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ createdAt: -1 });
testimonialSchema.index({ helpfulCount: -1 });

export default mongoose.model("Testimonial", testimonialSchema);
