import Booking from "../models/Booking.js";
import Inquiry from "../models/Inquiry.js";

const startOfToday = () => new Date(new Date().setHours(0, 0, 0, 0));
export const getOverview = async () => {
  const now = new Date(); const year = now.getFullYear(); const start = new Date(year, 0, 1); const end = new Date(year + 1, 0, 1); const today = startOfToday(); const nextWeek = new Date(today); nextWeek.setDate(nextWeek.getDate() + 7);
  const [totalEnquiries, confirmedEvents, revenue, pendingEnquiries, pendingBookings, upcoming, monthlyRows] = await Promise.all([
    Inquiry.countDocuments(), Booking.countDocuments({ status: "confirmed" }), Booking.aggregate([{ $match: { status: "confirmed" } }, { $group: { _id: null, total: { $sum: "$totalPrice" } } }]), Inquiry.countDocuments({ status: "new" }), Booking.countDocuments({ status: "pending" }), Booking.find({ eventDate: { $gte: today }, status: { $in: ["pending", "confirmed", "in-progress"] } }).sort({ eventDate: 1 }).limit(5).populate("packageId", "name").populate("serviceId", "name").populate("galleryItemId", "title"), Inquiry.aggregate([{ $match: { createdAt: { $gte: start, $lt: end } } }, { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } }]),
  ]);
  const trend = Array.from({ length: 12 }, (_, index) => monthlyRows.find((row) => row._id === index + 1)?.count || 0);
  return { metrics: { totalEnquiries, confirmedEvents, expectedRevenue: revenue[0]?.total || 0, pendingFollowUps: pendingEnquiries + pendingBookings }, trend, eventsThisWeek: await Booking.countDocuments({ eventDate: { $gte: today, $lt: nextWeek }, status: { $in: ["confirmed", "in-progress"] } }), upcoming: upcoming.map((booking) => ({ id: booking._id, title: booking.galleryItemId?.title || booking.packageId?.name || booking.serviceId?.name || "Event request", date: booking.eventDate, guests: booking.guestCount, status: booking.status })) };
};
