import { apiRequest } from "./api";

export const signup = async (userData) => {
  const data = await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  localStorage.setItem("handhold_token", data.token);
  localStorage.setItem("handhold_user", JSON.stringify(data.user));

  return data;
};

export const login = async (credentials) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  localStorage.setItem("handhold_token", data.token);
  localStorage.setItem("handhold_user", JSON.stringify(data.user));

  return data;
};

export const getCurrentUser = async () => {
  return apiRequest("/auth/me");
};

export const logout = () => {
  localStorage.removeItem("handhold_token");
  localStorage.removeItem("handhold_user");
};