export const checkAuth = () => {
  if (typeof document === "undefined") return false;

  const authToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));

  return !!authToken;
};
