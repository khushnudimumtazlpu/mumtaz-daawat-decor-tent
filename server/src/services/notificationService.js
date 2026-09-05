export const queueBookingConfirmation = async (booking) => ({
  delivery: process.env.EMAIL_FROM ? "configured" : "pending_configuration",
  recipient: booking.customerEmail,
  template: "booking-received",
  bookingId: booking.bookingId,
});
