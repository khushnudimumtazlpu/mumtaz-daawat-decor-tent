import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiUserCircle } from "react-icons/hi2";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { Button, Input } from "../components/common";
import { useAuth } from "../hooks/useAuth";

export default function CustomerLogin() {
  const { user, loginCustomer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from || "/";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: { email: "", password: "" } });
  if (user) return <Navigate to={user.role === "admin" ? "/admin/access" : destination} replace />;
  const submit = async (values) => {
    try {
      await loginCustomer(values);
      toast.success("Welcome back.");
      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return <AuthPageLayout eyebrow="Client access" title="Welcome back" copy="Sign in to keep your event details close at hand." icon={HiUserCircle}>
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(submit)} noValidate>
      <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register("email", { required: "Enter your email address" })} />
      <Input label="Password" type="password" autoComplete="current-password" placeholder="••••••••" error={errors.password?.message} {...register("password", { required: "Enter your password" })} />
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">{isSubmitting ? "Signing in…" : "Log in"}</Button>
    </form>
    <p className="mt-7 text-center text-sm text-slate-600">New to Aurelia? <Link className="font-bold text-[#8c6d17] hover:underline" to="/signup" state={{ from: destination }}>Create an account</Link></p>
    <p className="mt-3 text-center text-xs text-slate-500">Administrator? <Link className="font-bold text-[#8c6d17] hover:underline" to="/admin/login">Sign in here</Link></p>
  </AuthPageLayout>;
}
