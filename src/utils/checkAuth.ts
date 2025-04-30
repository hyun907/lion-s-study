export const checkAuth = () => {
  const authToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
  return !!authToken;
};
