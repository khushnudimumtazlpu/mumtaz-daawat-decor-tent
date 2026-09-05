import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiArrowLeft, HiLockClosed } from "react-icons/hi2";
import { Button, Input } from "../components/common";
import { useAuth } from "../hooks/useAuth";

export default function AdminLogin() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (admin) return <Navigate to="/admin/access" replace />;
  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await login(form);
      toast.success("Welcome back.");
      navigate(location.state?.from?.pathname || "/admin/access", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally { setIsSubmitting(false); }
  };
  return <main className="grid min-h-screen place-items-center bg-[#142235] px-5 py-10"><section className="w-full max-w-md rounded-[1.5rem] bg-white p-8 shadow-2xl md:p-10"><Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-slate-500 hover:text-[#b89225]"><HiArrowLeft /> Back to website</Link><div className="mt-10"><span className="inline-grid rounded-full bg-[#d4af37]/15 p-3 text-[#8c6d17]"><HiLockClosed className="text-2xl" /></span><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#b89225]">Secure access</p><h1 className="font-display mt-3 text-4xl text-[#142235]">Admin sign in</h1><p className="mt-3 text-sm leading-6 text-slate-600">Use your authorised Aurelia administrator account.</p></div><form className="mt-8 space-y-5" onSubmit={submit}><Input required label="Email address" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="admin@example.com" /><Input required label="Password" name="password" type="password" autoComplete="current-password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="••••••••" /><Button type="submit" disabled={isSubmitting} className="mt-2 w-full">{isSubmitting ? "Signing in…" : "Sign in securely"}</Button></form></section></main>;
}
