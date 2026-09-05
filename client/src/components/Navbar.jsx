import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const links = [["Home", "/"], ["Our Story", "/about"], ["Services", "/services"], ["Gallery", "/gallery"], ["Packages", "/packages"], ["Contact", "/contact"]];
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const linkClass = ({ isActive }) => `text-xs font-bold uppercase tracking-[.12em] transition ${isActive ? "text-[#d4af37]" : "text-slate-200 hover:text-[#d4af37]"}`;
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const accountActions = user ? <><Link to="/profile" className="text-xs font-bold uppercase tracking-[.1em] text-[#e4c860]">Hi, {user.name.split(" ")[0]}</Link><Link to="/profile" className="text-xs font-bold uppercase tracking-[.12em] text-slate-200 transition hover:text-[#d4af37]">My profile</Link><button onClick={handleLogout} className="text-xs font-bold uppercase tracking-[.12em] text-slate-200 transition hover:text-[#d4af37]">Log out</button></> : <><Link to="/login" className="text-xs font-bold uppercase tracking-[.12em] text-slate-200 transition hover:text-[#d4af37]">Log in</Link><Link to="/signup" className="rounded-full border border-[#d4af37] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#e4c860] transition hover:bg-[#d4af37] hover:text-[#142235]">Sign up</Link></>;
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#142235]/95 text-white backdrop-blur">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
      <Link to="/" className="font-display text-xl tracking-wide text-white">Mumtaz Daawat Decor <span className="text-[#d4af37]">& Tent</span></Link>
      <div className="hidden items-center gap-4 xl:flex">{links.map(([label, path]) => <NavLink key={path} to={path} className={linkClass}>{label}</NavLink>)}{accountActions}<Link to="/admin/login" className="text-xs font-bold uppercase tracking-[.12em] text-slate-200 transition hover:text-[#d4af37]">Admin portal</Link><Link to="/booking" className="rounded-full bg-[#d4af37] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#142235] transition hover:bg-[#e4c860]">Plan an event</Link></div>
      <button className="text-2xl xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <HiXMark /> : <HiBars3 />}</button>
    </nav>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 px-5 pb-5 xl:hidden"><div className="flex flex-col gap-5 pt-5">{links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={linkClass}>{label}</NavLink>)}<div className="flex flex-wrap items-center gap-4">{accountActions}</div><Link to="/admin/login" onClick={() => setOpen(false)} className={linkClass}>Admin portal</Link><Link to="/booking" onClick={() => setOpen(false)} className="text-[#d4af37]">Plan an event</Link></div></motion.div>}</AnimatePresence>
  </header>;
};
