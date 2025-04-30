export const checkAuth = () => {
  if (typeof window === "undefined") return null;
  const authToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
  return authToken ? authToken.split("=")[1] : null;
};
