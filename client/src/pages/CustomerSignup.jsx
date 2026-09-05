import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiUserPlus } from "react-icons/hi2";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { Button, Input } from "../components/common";
import { useAuth } from "../hooks/useAuth";

export default function CustomerSignup() {
  const { user, registerCustomer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from || "/";
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" } });
  if (user) return <Navigate to={user.role === "admin" ? "/admin/access" : destination} replace />;
  const submit = async ({ confirmPassword: _confirmPassword, ...values }) => {
    try {
      await registerCustomer(values);
      toast.success("Your account is ready.");
      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return <AuthPageLayout eyebrow="Client account" title="Plan with confidence" copy="Create an account to begin your Aurelia event journey." icon={HiUserPlus}>
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(submit)} noValidate>
      <Input label="Full name" autoComplete="name" placeholder="Your name" error={errors.name?.message} {...register("name", { required: "Enter your name" })} />
      <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register("email", { required: "Enter your email address", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
      <Input label="Phone number" type="tel" autoComplete="tel" placeholder="Your phone number" error={errors.phone?.message} {...register("phone", { required: "Enter your phone number" })} />
      <Input label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters" error={errors.password?.message} {...register("password", { required: "Create a password", minLength: { value: 8, message: "Use at least 8 characters" } })} />
      <Input label="Confirm password" type="password" autoComplete="new-password" placeholder="Repeat your password" error={errors.confirmPassword?.message} {...register("confirmPassword", { required: "Confirm your password", validate: (value) => value === watch("password") || "Passwords do not match" })} />
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">{isSubmitting ? "Creating account…" : "Create account"}</Button>
    </form>
    <p className="mt-7 text-center text-sm text-slate-600">Already have an account? <Link className="font-bold text-[#8c6d17] hover:underline" to="/login" state={{ from: destination }}>Log in</Link></p>
  </AuthPageLayout>;
}
