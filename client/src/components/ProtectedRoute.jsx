import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { admin, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <main className="grid min-h-screen place-items-center bg-[#faf9f6] text-sm font-bold uppercase tracking-[.16em] text-[#b89225]">Verifying your session</main>;
  return admin ? children : <Navigate to="/admin/login" replace state={{ from: location }} />;
};
