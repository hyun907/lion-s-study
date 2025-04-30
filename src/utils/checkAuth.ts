import { useUserStore } from "@/store/useUserStore";

export const checkAuth = () => {
  const authToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));

  if (!authToken) {
    useUserStore.getState().clearUser();
    localStorage.removeItem("user");
    return false;
  }

  return true;
};
