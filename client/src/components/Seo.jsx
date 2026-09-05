import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const business = "Mumtaz Daawat Decor & Tent";
const pages = {
  "/": [`${business} | Bespoke Event Experiences`, "Bespoke tented celebrations for weddings, private gatherings, and corporate occasions."],
  "/about": [`Our Story | ${business}`],
  "/services": [`Event Services | ${business}`],
  "/gallery": [`Event Gallery | ${business}`],
  "/packages": [`Event Packages | ${business}`],
  "/contact": [`Contact ${business}`],
  "/booking": [`Book Your Event | ${business}`],
  "/bookings": [`Book Your Event | ${business}`],
  "/login": [`Client Login | ${business}`],
  "/signup": [`Create Your Account | ${business}`],
  "/profile": [`My Profile | ${business}`],
  "/admin/login": [`Administrator Sign In | ${business}`],
  "/admin/access": [`Admin Overview | ${business}`],
  "/admin/bookings": [`Booking Management | ${business}`],
  "/admin/enquiries": [`Enquiry Management | ${business}`],
  "/admin/gallery": [`Gallery Management | ${business}`],
  "/admin/services": [`Service Management | ${business}`],
  "/admin/packages": [`Package Management | ${business}`],
};
export const Seo = () => { const { pathname } = useLocation(); useEffect(() => { const [title, description] = pages[pathname] || [`Page Not Found | ${business}`, "The page you requested could not be found."]; document.title = title; const tag = document.querySelector('meta[name="description"]'); if (description && tag) tag.setAttribute("content", description); }, [pathname]); return null; };
