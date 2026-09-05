const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: "include",
    headers: { ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...options.headers },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || "Something went wrong. Please try again.");
  return body;
};
