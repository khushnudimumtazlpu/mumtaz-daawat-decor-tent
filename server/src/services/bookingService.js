import crypto from "crypto";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Gallery from "../models/Gallery.js";
import Package from "../models/Package.js";
import Service from "../models/Service.js";
import { queueBookingConfirmation } from "./notificationService.js";
import { buildListQuery, paginationMeta } from "../utils/queryFeatures.js";

const createBookingId = () => `BK-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
const invalid = (message) => Object.assign(new Error(message), { statusCode: 400 });
const asNumber = (value, field) => { const number = Number(value); if (!Number.isFinite(number) || number <= 0) throw invalid(`${field} must be greater than zero`); return number; };

export const create = async (payload, userId = null) => {
  const bookingType = payload.bookingType || "package";
  const eventDate = new Date(payload.eventDate);
  if (Number.isNaN(eventDate.getTime()) || eventDate < new Date(new Date().setHours(0, 0, 0, 0))) throw invalid("Please select a future event date");
  const guestCount = asNumber(payload.guestCount, "Guest count");
  let packageId = null; let serviceId = null; let galleryItemId = null; let basePrice; let duration; const maximumGuests = 7000;

  if (bookingType === "package") {
    if (!mongoose.isValidObjectId(payload.packageId)) throw invalid("Select a valid package");
    const item = await Package.findOne({ _id: payload.packageId, isActive: true, availability: true }).populate("serviceId", "isActive availability");
    if (!item || !item.serviceId?.isActive || !item.serviceId?.availability) throw invalid("Selected package is not currently available");
    packageId = item._id; serviceId = item.serviceId._id; basePrice = item.discountedPrice ?? item.price; duration = item.duration;
  } else if (bookingType === "service") {
    if (!mongoose.isValidObjectId(payload.serviceId)) throw invalid("Select a valid service");
    const item = await Service.findOne({ _id: payload.serviceId, isActive: true, availability: true });
    if (!item) throw invalid("Selected service is not currently available");
    serviceId = item._id; basePrice = item.price; duration = item.duration;
  } else if (bookingType === "gallery") {
    if (!mongoose.isValidObjectId(payload.galleryItemId)) throw invalid("Select a valid decoration");
    const item = await Gallery.findOne({ _id: payload.galleryItemId, isActive: true });
    if (!item) throw invalid("Selected decoration is not currently available");
    galleryItemId = item._id; basePrice = item.startingPrice; duration = asNumber(payload.duration || 1, "Event duration");
  } else throw invalid("Invalid booking type");

  if (guestCount > maximumGuests) throw invalid("A booking request can include up to 7,000 guests");
  const booking = await Booking.create({ bookingId: createBookingId(), userId, bookingType, customerName: payload.customerName, customerEmail: payload.customerEmail, customerPhone: payload.customerPhone, packageId, serviceId, galleryItemId, eventDate, guestCount, venue: payload.venue, duration, basePrice, discountAmount: 0, totalPrice: basePrice, remainingPayment: basePrice, specialRequirements: payload.specialRequirements || null });
  return { booking, email: await queueBookingConfirmation(booking) };
};

export const list = async (query) => {
  const { filter, page, limit, sort } = buildListQuery(query, { searchFields: ["bookingId", "customerName", "customerEmail", "venue"], filterFields: { status: "string", paymentStatus: "string", serviceId: "string", packageId: "string", bookingType: "string" }, sortFields: ["createdAt", "eventDate", "totalPrice", "status", "bookingId"] });
  const records = Booking.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).populate("packageId", "name tier").populate("serviceId", "name category").populate("galleryItemId", "title");
  const [items, total] = await Promise.all([records, Booking.countDocuments(filter)]);
  return { items, pagination: paginationMeta({ total, page, limit }) };
};
export const listForUser = (userId) => Booking.find({ userId }).sort({ createdAt: -1 }).populate("packageId", "name").populate("serviceId", "name").populate("galleryItemId", "title");
export const remove = async (id) => { const booking = await Booking.findByIdAndDelete(id); if (!booking) throw Object.assign(new Error("Booking not found"), { statusCode: 404 }); };
export const removeForUser = async (id, userId) => { const booking = await Booking.findOneAndDelete({ _id: id, userId }); if (!booking) throw Object.assign(new Error("Booking not found"), { statusCode: 404 }); };
export const completeDemoPayment = async (id, userId) => {
  const booking = await Booking.findOne({ _id: id, userId });
  if (!booking) throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  if (booking.status !== "confirmed") throw invalid("Payment becomes available once the booking is confirmed by the admin");
  if (booking.paymentStatus === "paid") return booking;
  booking.paymentStatus = "paid"; booking.advancePayment = booking.totalPrice; booking.remainingPayment = 0; booking.paymentTransactionId = `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  await booking.save();
  return booking;
};
export const getById = async (id) => { const booking = await Booking.findById(id).populate("packageId", "name tier").populate("serviceId", "name category"); if (!booking) throw Object.assign(new Error("Booking not found"), { statusCode: 404 }); return booking; };
export const update = async (id, payload) => { if (payload.status === "cancelled" && !payload.cancelReason) throw invalid("A cancellation reason is required"); const booking = await Booking.findByIdAndUpdate(id, payload, { new: true, runValidators: true, context: "query" }); if (!booking) throw Object.assign(new Error("Booking not found"), { statusCode: 404 }); return booking; };
