const isProduction = process.env.NODE_ENV === "production";

const getCookieBaseOptions = () => ({
  httpOnly: true,
  // Vercel and Render use separate origins. Cross-origin API requests need a
  // secure cross-site cookie after deployment, while localhost keeps lax mode.
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});

export const getAuthCookieOptions = () => getCookieBaseOptions();

export const getClearedAuthCookieOptions = () => {
  const { maxAge: _maxAge, ...options } = getCookieBaseOptions();
  return options;
};
