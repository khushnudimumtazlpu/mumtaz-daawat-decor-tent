import { apiRequest } from "./apiClient";
export const getDashboardOverview = async () => (await apiRequest("/admin/overview")).data;
