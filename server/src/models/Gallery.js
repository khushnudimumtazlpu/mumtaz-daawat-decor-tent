import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema({ url: { type: String, required: true }, publicId: { type: String, required: true }, alt: { type: String, required: true, trim: true } }, { _id: false });

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide a decoration title"], trim: true, maxlength: 120 },
  description: { type: String, default: null, maxlength: 1500 },
  images: { type: [galleryImageSchema], required: true, validate: { validator: (images) => images.length >= 1 && images.length <= 8, message: "A gallery collection must contain between 1 and 8 images" } },
  category: { type: String, enum: ["wedding", "corporate", "festival", "adventure", "other"], required: true },
  customCategory: { type: String, default: null, trim: true, maxlength: 60 },
  startingPrice: { type: Number, required: [true, "Please provide a starting price"], min: [0, "Starting price cannot be negative"] },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ featured: 1, createdAt: -1 });

export default mongoose.model("Gallery", gallerySchema);
