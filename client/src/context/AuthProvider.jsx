import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { apiRequest } from "../services/apiClient";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifySession = useCallback(async () => {
    const [customer, administrator] = await Promise.allSettled([apiRequest("/auth/verify"), apiRequest("/admin/auth/verify")]);
    setUser(customer.status === "fulfilled" ? customer.value.data.user : null);
    setAdmin(administrator.status === "fulfilled" ? administrator.value.data.admin : null);
    setIsLoading(false);
  }, []);

  useEffect(() => { verifySession(); }, [verifySession]);

  const login = async (credentials) => {
    const response = await apiRequest("/admin/auth/login", { method: "POST", body: JSON.stringify(credentials) });
    setAdmin(response.data.admin);
    setUser(null);
    return response;
  };

  const loginCustomer = async (credentials) => {
    const response = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
    setUser(response.data.user);
    
    return response;
  };

  const registerCustomer = async (details) => {
    const response = await apiRequest("/auth/register", { method: "POST", body: JSON.stringify(details) });
    setUser(response.data.user);
    
    return response;
  };

  const updateCustomerProfile = async (details) => {
    const response = await apiRequest("/auth/profile", { method: "PATCH", body: JSON.stringify(details) });
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = async () => { try { await apiRequest("/auth/logout", { method: "POST" }); } finally { setUser(null); } };
  const logoutAdmin = async () => { try { await apiRequest("/admin/auth/logout", { method: "POST" }); } finally { setAdmin(null); } };

  const value = useMemo(() => ({ admin, user, isLoading, login, loginCustomer, registerCustomer, updateCustomerProfile, logout, logoutAdmin, verifySession }), [admin, user, isLoading, verifySession]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
