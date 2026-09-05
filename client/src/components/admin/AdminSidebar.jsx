import { Link, NavLink } from "react-router-dom";
import { HiOutlineCalendarDays, HiOutlineChartBar, HiOutlineCog6Tooth, HiOutlineDocumentText, HiOutlinePhoto, HiOutlineSquares2X2, HiOutlineXMark } from "react-icons/hi2";

const navigation = [
  [HiOutlineSquares2X2, "Overview", "/admin/access"],
  [HiOutlineCalendarDays, "Bookings", "/admin/bookings"],
  [HiOutlineDocumentText, "Enquiries", "/admin/enquiries"],
  [HiOutlinePhoto, "Gallery", "/admin/gallery"],
  [HiOutlineDocumentText, "Services", "/admin/services"],
  [HiOutlineDocumentText, "Packages", "/admin/packages"],
  [HiOutlineChartBar, "Analytics"],
];

export const AdminSidebar = ({ open, onClose }) => <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#142235] px-5 py-6 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center justify-between px-3"><Link to="/admin/access" className="font-display text-3xl">Aurelia<span className="text-[#d4af37]">.</span></Link><button className="text-2xl lg:hidden" onClick={onClose} aria-label="Close navigation"><HiOutlineXMark /></button></div><p className="mt-4 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#d4af37]">Administration</p><nav className="mt-7 grid gap-1" aria-label="Admin navigation">{navigation.map(([Icon, label, path]) => path ? <NavLink key={label} to={path} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-[#d4af37] text-[#142235]" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon className="text-xl" />{label}</NavLink> : <button key={label} className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/10"><Icon className="text-xl" />{label}<span className="ml-auto text-[10px] uppercase tracking-wide opacity-60">Soon</span></button>)}</nav><div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-5"><HiOutlineCog6Tooth className="text-xl text-[#d4af37]" /><p className="mt-3 text-sm font-semibold">Settings are ready</p><p className="mt-1 text-xs leading-5 text-slate-400">Manage your preferences below. Saving will be added with API integration.</p></div></aside>;
