import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  sentAt: { type: Date, default: Date.now },
  delivery: { type: String, enum: ["pending_configuration", "sent"], default: "pending_configuration" },
}, { _id: false });

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  name: { type: String, required: [true, "Please provide your name"], trim: true, maxlength: 100 },
  email: { type: String, required: [true, "Please provide your email"], trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] },
  phone: { type: String, trim: true, maxlength: 30, default: "" },
  message: { type: String, required: [true, "Please describe your event"], trim: true, minlength: 10, maxlength: 3000 },
  status: { type: String, enum: ["new", "responded", "closed"], default: "new" },
  responses: { type: [responseSchema], default: [] },
}, { timestamps: true });

inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ email: 1, createdAt: -1 });

export default mongoose.model("Inquiry", inquirySchema);
